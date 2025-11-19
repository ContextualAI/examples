import { NextResponse } from 'next/server'
import ContextualAI from 'contextual-client'

export async function POST(request: Request) {
  try {
    const { messageId, contentIds } = await request.json()

    if (!messageId) {
      return NextResponse.json(
        { error: 'Message ID is required' },
        { status: 400 }
      )
    }

    if (!contentIds || !Array.isArray(contentIds) || contentIds.length === 0) {
      return NextResponse.json(
        { error: 'Content IDs are required' },
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

    const client = new ContextualAI({
      apiKey: apiKey,
    })

    // Fetch detailed retrieval info
    const retrievalInfo = await client.agents.query.retrievalInfo(
      agentId,
      messageId,
      { content_ids: contentIds }
    )

    const contentMetadatas = retrievalInfo.content_metadatas || []

    return NextResponse.json({ 
      contentMetadatas
    })
  } catch (error: any) {
    console.error('Error fetching retrieval info:', error)
    
    if (error instanceof ContextualAI.APIError) {
      return NextResponse.json(
        { error: `API Error: ${error.message}` },
        { status: error.status || 500 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

