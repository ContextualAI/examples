import { NextResponse } from 'next/server'
import ContextualAI from 'contextual-client'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: 'No messages provided' },
        { status: 400 }
      )
    }

    const apiKey = process.env.CONTEXTUAL_API_KEY
    const agentId = process.env.CONTEXTUAL_AGENT_ID

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured. Please set CONTEXTUAL_API_KEY in .env.local' },
        { status: 500 }
      )
    }

    if (!agentId) {
      return NextResponse.json(
        { error: 'Agent ID not configured. Please set CONTEXTUAL_AGENT_ID in .env.local' },
        { status: 500 }
      )
    }

    const encoder = new TextEncoder()

    const sseStream = new ReadableStream<Uint8Array>({
      start: async (controller) => {
        const encodeSSE = (data: string) => encoder.encode(`data: ${data}\n\n`)
        const encodeComment = (comment: string) => encoder.encode(`: ${comment}\n\n`)

        controller.enqueue(encodeComment('stream-start'))

        let heartbeat: NodeJS.Timeout | null = null
        const startHeartbeat = () => {
          heartbeat = setInterval(() => {
            try {
              controller.enqueue(encodeComment('keep-alive'))
            } catch (_) {
            }
          }, 15000)
        }

        const stopHeartbeat = () => {
          if (heartbeat) {
            clearInterval(heartbeat)
            heartbeat = null
          }
        }

        try {
          let observedMessageId: string | null = null
          const observedContentIds: string[] = []
          let observeBuffer = ''
          const observeChunk = (text: string) => {
            observeBuffer += text
            if (observeBuffer.includes('\r')) observeBuffer = observeBuffer.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
            while (true) {
              const sep = observeBuffer.indexOf('\n\n')
              if (sep === -1) break
              const raw = observeBuffer.slice(0, sep)
              observeBuffer = observeBuffer.slice(sep + 2)
              const lines = raw.split('\n')
              if (lines.every(l => l.startsWith(':'))) continue
              const dataPayload = lines.filter(l => l.startsWith('data:')).map(l => l.slice(5).trimStart()).join('\n')
              if (!dataPayload) continue
              try {
                const evt = JSON.parse(dataPayload)
                if (evt?.event === 'metadata') {
                  if (evt.data?.message_id) observedMessageId = evt.data.message_id
                } else if (evt?.event === 'retrievals') {
                  const contents = evt.data?.contents || []
                  for (const c of contents) {
                    const cid = c?.content_id
                    if (cid && !observedContentIds.includes(cid)) observedContentIds.push(cid)
                  }
                }
              } catch (_) {
                
              }
            }
          }

          const upstream = await fetch(`https://api.contextual.ai/v1/agents/${agentId}/query?include_retrieval_content_text=true`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              messages: messages.map((msg: Message) => ({ role: msg.role, content: msg.content })),
              stream: true,
            }),
          })

          if (!upstream.ok || !upstream.body) {
            const text = await upstream.text().catch(() => '')
            const errMsg = `Upstream error ${upstream.status}: ${text}`
            console.error('[ctxl-stream] upstream failed:', errMsg)
            controller.enqueue(encodeSSE(JSON.stringify({ error: errMsg })))
            controller.close()
            stopHeartbeat()
            return
          }

          startHeartbeat()

          const reader = upstream.body.getReader()
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            if (value) {
              controller.enqueue(value)
              try {
                const chunkStr = new TextDecoder().decode(value)
                observeChunk(chunkStr)
              } catch (_) {
                
              }
            }
          }

          try {
            if (observedMessageId && observedContentIds.length > 0) {
              const client = new ContextualAI({ apiKey })
              const retrievalInfo = await client.agents.query.retrievalInfo(
                agentId,
                observedMessageId,
                { content_ids: observedContentIds }
              )
              const contentMetadatas = retrievalInfo?.content_metadatas || []
              controller.enqueue(encodeSSE(JSON.stringify({ event: 'content_metadatas', data: { content_metadatas: contentMetadatas } })))
            }
          } catch (e) {
            console.error('[ctxl-stream] retrievalInfo failed:', e)
          }

          controller.enqueue(encodeComment('stream-end'))
          controller.close()
          stopHeartbeat()
        } catch (err: any) {
          console.error('[ctxl-stream] error:', err?.message || err)
          try {
            controller.enqueue(encodeSSE(JSON.stringify({ error: String(err?.message || err) })))
          } finally {
            controller.close()
            stopHeartbeat()
          }
        }
      },
      cancel: () => {
      },
    })

    return new Response(sseStream, {
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
        'X-Accel-Buffering': 'no',
      },
    })
  } catch (error: any) {
    console.error('Error in chat API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

