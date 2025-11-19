'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  retrievalContents?: any[]
  detailedRetrievals?: any[]
  messageId?: string
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0)
  const [hasPlayedMusic, setHasPlayedMusic] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [selectedCitation, setSelectedCitation] = useState<any>(null)
  const [showCitationModal, setShowCitationModal] = useState(false)
  const [isTweetExpanded, setIsTweetExpanded] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const assistantIndexRef = useRef<number | null>(null)
  const lastRenderedRef = useRef<string>('')
  
  // Generate stars ONCE and never again
  const stars = useRef(
    Array.from({ length: 100 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
    }))
  ).current

  const loadingMessages = [
    "Alright, alright, alright... just a second",
    "Looking through the Interstellar files",
    "Checking my journal entries",
    "Searching through Greenlights",
    "Finding that Texas wisdom",
    "Consulting the stars",
    "Just keep livin', give me a moment",
    "Time is a flat circle... finding your answer",
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingMessageIndex((prev) => (prev + 1) % loadingMessages.length)
      }, 2000) // Change message every 2 seconds

      return () => clearInterval(interval)
    }
  }, [isLoading, loadingMessages.length])

  // Try to play music on mount (might fail due to browser autoplay policy)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3
      audioRef.current.play()
        .then(() => {
          setHasPlayedMusic(true)
          setIsMusicPlaying(true)
          console.log('Music auto-started')
        })
        .catch(() => {
          // Autoplay blocked - will start on first user interaction
          console.log('Autoplay blocked - music will start on first interaction')
        })
    }
  }, [])

  const startMusicIfNeeded = () => {
    if (!hasPlayedMusic && audioRef.current) {
      audioRef.current.volume = 0.3
      audioRef.current.play()
        .then(() => {
          setHasPlayedMusic(true)
          setIsMusicPlaying(true)
          console.log('Music started playing')
        })
        .catch(err => console.error('Audio play failed:', err))
    }
  }

  // Process message content to add clickable citations
  const processMessageWithCitations = (content: string, retrievalContents: any[] = []) => {
    if (!retrievalContents || retrievalContents.length === 0) {
      return content
    }

    // First, clean up markdown-style citations [1]()() or [1]() -> [1]
    // This matches [number] followed by one or more ()() pairs
    let cleanContent = content.replace(/\[(\d+)\](\(\))+/g, '[$1]')
    
    // Then make citation numbers clickable
    return cleanContent.replace(/\[(\d+)\]/g, (match, citationNumber) => {
      const citationIndex = parseInt(citationNumber) - 1
      if (citationIndex >= 0 && citationIndex < retrievalContents.length) {
        return `<span class="citation-link" data-citation="${citationIndex}" style="color: #60a5fa; text-decoration: underline; cursor: pointer; font-weight: 500;">${match}</span>`
      }
      return match
    })
  }

  const handleCitationClick = async (citationIndex: number, message: Message) => {
    const hasDetails = !!(message.detailedRetrievals && message.detailedRetrievals[citationIndex])
    const base = hasDetails ? message.detailedRetrievals![citationIndex] : {}

    const initialSelected = {
      ...base,
        citationNumber: citationIndex + 1,
      retrievalContent: message.retrievalContents?.[citationIndex],
    }
    setSelectedCitation(initialSelected)
    setShowCitationModal(true)

    // If page_img already present, no need to fetch more
    if ((base as any)?.page_img) return

    try {
      const content = message.retrievalContents?.[citationIndex]
      const contentId = content?.content_id
      const msgId = message.messageId
      if (!contentId || !msgId) return

      const resp = await fetch('/api/retrieval-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageId: msgId, contentIds: [contentId] }),
      })
      if (!resp.ok) return
      const data = await resp.json()
      const meta = (data?.contentMetadatas && data.contentMetadatas[0]) || null
      const pageImg = meta?.page_img || null
      const contentText = content?.content_text || ''

      if (pageImg) {
        // Update selected citation with the fetched page image
        setSelectedCitation((prev: any) => {
          if (!prev) return prev
          return {
            ...prev,
            page_img: pageImg,
            content_text: prev.content_text || contentText,
          }
        })
      }
    } catch (e) {
      console.error('Failed to fetch citation image', e)
    }
  }

  const closeCitationModal = () => {
    setShowCitationModal(false)
    setSelectedCitation(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    startMusicIfNeeded()

    const userMessage: Message = { role: 'user', content: input }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)
    assistantIndexRef.current = null
    lastRenderedRef.current = ''

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
        }),
      })

      if (!response.ok || !response.body) {
        throw new Error('Network error')
      }

      // Parse SSE stream
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let streamedContent = ''
      let retrievalContents: any[] = []
      let messageId = ''
      let conversationId = ''

      // Reset streamedContent and ensure refs are clean
      streamedContent = ''
      assistantIndexRef.current = null
      lastRenderedRef.current = ''

      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        // Normalize CRLF to LF to ensure consistent event splitting
        if (buffer.includes('\r')) buffer = buffer.replace(/\r\n/g, '\n').replace(/\r/g, '\n')

        // Process complete SSE events separated by blank line
        while (true) {
          const lfSep = buffer.indexOf('\n\n')
          const crlfSep = buffer.indexOf('\r\n\r\n')
          let sep = -1
          let sepLen = 2
          if (lfSep !== -1 && crlfSep !== -1) {
            sep = Math.min(lfSep, crlfSep)
            sepLen = sep === lfSep ? 2 : 4
          } else if (lfSep !== -1) {
            sep = lfSep
            sepLen = 2
          } else if (crlfSep !== -1) {
            sep = crlfSep
            sepLen = 4
          }
          if (sep === -1) break
          const raw = buffer.slice(0, sep)
          buffer = buffer.slice(sep + sepLen)

          const lines = raw.split('\n')
          if (lines.every(l => l.startsWith(':'))) continue

          const dataPayload = lines
            .filter(l => l.startsWith('data:'))
            .map(l => l.slice(5).trimStart())
            .join('\n')
          if (!dataPayload) continue

          let evt
          try {
            evt = JSON.parse(dataPayload)
          } catch {
            continue
          }

          // Handle events
          switch (evt.event) {
            case 'metadata':
              if (evt.data?.conversation_id) conversationId = evt.data.conversation_id
              if (evt.data?.message_id) messageId = evt.data.message_id
              break
            case 'retrievals':
              if (evt.data?.contents) {
                retrievalContents = evt.data.contents
              }
              break
            case 'message_delta':
              if (evt.data?.delta) {
                streamedContent += evt.data.delta

                if (assistantIndexRef.current === null) {
                  assistantIndexRef.current = -1  // Temporary marker to prevent duplicate insertion
                  setIsLoading(false)
                  
                  lastRenderedRef.current = streamedContent
                  
                  const placeholderRetrievals = retrievalContents.map((content: any) => ({
                    content_text: content.content_text || '',
                    page_img: null, 
                    retrievalContent: content,
                  }))
                  
                  setMessages(prev => {
                    const index = prev.length
                    assistantIndexRef.current = index  
                    return [
                      ...prev,
                      {
          role: 'assistant',
                        content: streamedContent,
                        retrievalContents,
                        detailedRetrievals: placeholderRetrievals,
                        messageId,
                      }
                    ]
                  })
      } else {
                  // Subsequent deltas update the existing assistant message
                  if (streamedContent.length <= lastRenderedRef.current.length || 
                      streamedContent === lastRenderedRef.current) {
                    continue  
                  }
                  
                  lastRenderedRef.current = streamedContent
                  setMessages(prev => {
                    if (assistantIndexRef.current === null || 
                        assistantIndexRef.current < 0 || 
                        assistantIndexRef.current >= prev.length) {
                      return prev
                    }
                    const updated = [...prev]
                    const idx = assistantIndexRef.current
                    
                    if (updated[idx].content.length >= streamedContent.length && 
                        updated[idx].content === streamedContent) {
                      return prev
                    }
                    
                    updated[idx] = {
                      ...updated[idx],
                      content: streamedContent,
                      retrievalContents,
                      messageId,
                    }
                    return updated
                  })
                }
              }
              break
            case 'message_complete':
              if (evt.data?.final_message) {
                streamedContent = evt.data.final_message
              }
              break
            case 'attributions':
              // Attributions are already in the message via citations
              break
            case 'content_metadatas': {
              const contentMetadatas = evt.data?.content_metadatas || []
              const metadataMap = new Map()
              let useIndexMatching = true
              contentMetadatas.forEach((meta: any) => {
                if (meta.content_id) {
                  metadataMap.set(meta.content_id, meta)
                  useIndexMatching = false
                }
              })
              const merged = retrievalContents.map((content: any, index: number) => {
                const meta = useIndexMatching ? (contentMetadatas[index] || {}) : (metadataMap.get(content.content_id) || {})
                return {
                  content_text: content?.content_text || '',
                  page_img: meta?.page_img || null,
                  retrievalContent: content,
                }
              })
              if (assistantIndexRef.current !== null) {
                setMessages(prev => {
                  if (assistantIndexRef.current === null || assistantIndexRef.current >= prev.length) return prev
                  const updated = [...prev]
                  const idx = assistantIndexRef.current
                  updated[idx] = {
                    ...updated[idx],
                    detailedRetrievals: merged,
                    retrievalContents,
                    messageId,
                  }
                  return updated
                })
              }
              break
            }
            case 'end':
              break
            case 'error':
              throw new Error(evt.data?.message || 'Stream error')
            default:
              break
          }
        }
      }

      setIsLoading(false)
      
      // Fetch detailed retrieval info with page_img
      let detailedRetrievals: any[] = []
      if (messageId && retrievalContents.length > 0) {
        try {
          const contentIds = retrievalContents.map((content: any) => content.content_id).filter(Boolean)
          if (contentIds.length > 0) {
            const retrievalInfoResponse = await fetch('/api/retrieval-info', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                messageId,
                contentIds,
              }),
            })
            
            if (retrievalInfoResponse.ok) {
              const retrievalInfoData = await retrievalInfoResponse.json()
              const contentMetadatas = retrievalInfoData.contentMetadatas || []
              
              // Merge contentMetadatas (page_img) with retrievalContents
              const metadataMap = new Map()
              let useIndexMatching = true
              contentMetadatas.forEach((meta: any, idx: number) => {
                if (meta.content_id) {
                  metadataMap.set(meta.content_id, meta)
                  useIndexMatching = false
                }
              })
              
              detailedRetrievals = retrievalContents.map((content: any, index: number) => {
                const metadata = useIndexMatching 
                  ? (contentMetadatas[index] || {})
                  : (metadataMap.get(content.content_id) || {})
                return {
                  content_text: content.content_text || '',
                  page_img: metadata.page_img || null, 
                  retrievalContent: content,
                }
              })
            }
          }
        } catch (error) {
          console.error('Error fetching detailed retrieval info:', error)
        }
      }
      
      if (detailedRetrievals.length === 0) {
        detailedRetrievals = retrievalContents.map((content: any) => ({
          content_text: content.content_text || '',
          page_img: null,
          retrievalContent: content,
        }))
      }
      
      setMessages(prev => {
        if (assistantIndexRef.current === null) {
          const index = prev.length
          assistantIndexRef.current = index
          lastRenderedRef.current = streamedContent
          return [
            ...prev,
            {
              role: 'assistant',
              content: streamedContent,
              retrievalContents,
              detailedRetrievals,
              messageId,
            }
          ]
        }
        if (assistantIndexRef.current < 0 || assistantIndexRef.current >= prev.length) return prev
        const updated = [...prev]
        const idx = assistantIndexRef.current
        
        if (updated[idx].content.length >= streamedContent.length && 
            updated[idx].content === streamedContent) {
          return prev
        }
        
        lastRenderedRef.current = streamedContent
        updated[idx] = {
          ...updated[idx],
          content: streamedContent,
          retrievalContents,
          detailedRetrievals,
          messageId,
        }
        return updated
      })

    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again.',
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const suggestedQueries = [
    "What's one bold, 'unrealistic' goal you have written down?",
    "What are your thoughts on having a personal LLM?",
    "Tell me the story behind 'alright, alright, alright'",
  ]

  const handleSuggestedQuery = (query: string) => {
    startMusicIfNeeded()
    setInput(query)
  }

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause()
        setIsMusicPlaying(false)
      } else {
        audioRef.current.volume = 0.3
        audioRef.current.play()
          .then(() => {
            setHasPlayedMusic(true)
            setIsMusicPlaying(true)
          })
          .catch(err => console.error('Audio play failed:', err))
      }
    }
  }

  return (
    <main className="relative min-h-screen flex flex-col bg-[#0b0c10]">
      {/* Starfield background */}
      <div className="starfield">
        {stars.map((star, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
            }}
          />
        ))}
      </div>

      {/* Audio element */}
      <audio ref={audioRef} src="/interstellar.mp3" preload="auto" loop />
      
      {/* Music toggle button */}
      <button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 bg-[#1a1b24]/80 backdrop-blur-sm hover:bg-[#1f2029] text-gray-300 hover:text-white p-3 rounded-full border border-white/10 hover:border-white/30 transition-all duration-200 shadow-lg hover:shadow-xl group"
        aria-label={isMusicPlaying ? "Mute music" : "Play music"}
        title={isMusicPlaying ? "Mute music" : "Play music"}
      >
        {isMusicPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-3xl w-full mx-auto py-8 px-6 md:px-8">
        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight drop-shadow-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <a 
              href="https://contextual.ai/?utm_campaign=McConaughey&utm_source=contextualai&utm_medium=website&utm_content=title"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-200 transition-all cursor-pointer hover:underline underline-offset-4"
            >
              Matthew McConaughAI
            </a>
          </h1>
          <p className="text-gray-300 text-sm md:text-base font-light mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Wisdom, Philosophy, and Life Lessons
            <span className="mx-2 text-gray-500">|</span>
            <a 
              href="https://colab.research.google.com/drive/1AY-lbs0B-9zRyK8AY0tHHlKcXEGk9sTs?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white hover:underline transition-all underline-offset-2 cursor-pointer"
            >
              📓 How we built this agent
            </a>
          </p>
          <p className="text-gray-400 text-xs md:text-sm font-light" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <a 
              href="https://app.contextual.ai/?signup=1?utm_campaign=McConaughey&utm_source=contextualai&utm_medium=website&utm_content=website"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white hover:underline transition-all underline-offset-2 cursor-pointer"
            >
              Build your own
            </a>
          </p>
        </header>

        {/* Collapsible tweet banner */}
        <div className="mb-6">
          <button
            onClick={() => setIsTweetExpanded(!isTweetExpanded)}
            className="w-full bg-[#11121a]/60 hover:bg-[#11121a]/80 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-2xl px-5 py-3.5 text-left transition-all duration-200 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl">🎬</span>
                <div>
                  <h3 className="text-white text-sm font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Matthew on Personal LLMs
                  </h3>
                  <p className="text-gray-400 text-xs mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Why he wants an AI that only responds based on his content
                  </p>
                </div>
              </div>
              <svg 
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isTweetExpanded ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
          
          {isTweetExpanded && (
            <div className="mt-3 bg-[#11121a]/60 backdrop-blur-sm border border-white/10 rounded-2xl p-4 overflow-hidden">
              <div className="w-full max-w-full overflow-hidden">
                <iframe
                  src="https://platform.twitter.com/embed/Tweet.html?id=1969054219647803765"
                  className="w-full border-0 rounded-lg"
                  style={{ minHeight: '500px', maxHeight: '600px' }}
                  title="Matthew McConaughey Tweet"
                />
              </div>
            </div>
          )}
        </div>

        {/* Chat container */}
        <div className="flex flex-col bg-[#11121a]/90 backdrop-blur-xl rounded-3xl overflow-hidden h-[600px] shadow-2xl border border-white/10">
          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center px-6">
                <div className="max-w-2xl w-full">
                  <p className="text-white text-base md:text-lg mb-8 leading-relaxed font-light" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Ask me anything about life, goals, philosophy, or just shoot the breeze.
                  </p>
                  <div className="space-y-2.5 w-full">
                    <p className="text-xs text-gray-500 mb-4 uppercase tracking-[0.15em] font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>Suggested Prompts</p>
                    {suggestedQueries.map((query, i) => (
                      <button
                        key={i}
                        onClick={() => handleSuggestedQuery(query)}
                        className="group block w-full text-left px-5 py-3.5 text-sm text-gray-300 hover:text-white bg-[#1a1b24]/60 hover:bg-[#1f2029] rounded-xl transition-all duration-200 border border-white/10 hover:border-white/30 shadow-sm hover:shadow-md hover:scale-[1.01]"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        <span className="flex items-center gap-3">
                          <span className="text-gray-400 group-hover:text-white transition-all text-base">→</span>
                          <span className="flex-1">{query}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`message-enter flex gap-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0 mt-1">
                    <img
                      src="/headshot_ghiblify.png"
                      alt="Matthew McConaughey"
                      className="w-10 h-10 rounded-full border-2 border-white/20 shadow-lg object-cover"
                    />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-5 py-3.5 shadow-lg ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-[#1f2029] to-[#1a1b24] text-white border border-white/20'
                      : 'bg-[#16171f] text-gray-100 border border-white/10'
                  }`}
                >
                  <div 
                    className="whitespace-pre-wrap leading-relaxed text-sm" 
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                    dangerouslySetInnerHTML={{
                      __html: message.role === 'assistant' 
                        ? processMessageWithCitations(message.content, message.retrievalContents)
                        : message.content
                    }}
                    onClick={(e) => {
                      const target = e.target as HTMLElement
                      if (target.classList.contains('citation-link')) {
                        const citationIndex = parseInt(target.getAttribute('data-citation') || '0')
                        handleCitationClick(citationIndex, message)
                      }
                    }}
                  />
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <img
                    src="/headshot_ghiblify.png"
                    alt="Matthew McConaughey"
                    className="w-10 h-10 rounded-full border-2 border-white/20 shadow-lg object-cover"
                  />
                </div>
                <div className="bg-[#14151f] rounded-2xl px-5 py-3 min-w-[240px] border border-white/5 shadow-lg">
                  <div className="flex items-center space-x-2.5">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-xs text-gray-400 transition-all duration-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {loadingMessages[loadingMessageIndex]}...
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="bg-[#0d0e14]/80 backdrop-blur-sm px-5 py-4 border-t border-white/10">
            <form onSubmit={handleSubmit} className="flex gap-2.5">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onFocus={startMusicIfNeeded}
                      onClick={startMusicIfNeeded}
                      placeholder="Ask Matthew anything..."
                      className="flex-1 bg-[#1a1b24] text-white rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 placeholder-gray-500 transition-all text-sm border border-white/10 shadow-inner"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                      disabled={isLoading}
                    />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-white hover:bg-gray-100 text-black font-bold px-8 py-3 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 text-sm shadow-lg hover:shadow-xl hover:shadow-white/20 hover:scale-105 active:scale-95"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Send
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 mt-8 text-center">
          <div className="flex flex-wrap justify-center items-center gap-5 text-sm text-gray-300 mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <a 
              href="https://contextual.ai/?utm_campaign=McConaughey&utm_source=contextualai&utm_medium=website&utm_content=website" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white hover:underline transition-all underline-offset-2 cursor-pointer"
            >
              Powered by Contextual AI
            </a>
          </div>
          
          {/* Disclaimer - subtle but always visible */}
          <div className="max-w-2xl mx-auto">
            <p className="text-[10px] text-gray-600 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Not affiliated with Matthew McConaughey. Educational demo. Content from publicly available sources. 
              All copyrights belong to their respective holders.
            </p>
          </div>
        </footer>
      </div>

      {/* Citation Modal */}
      {showCitationModal && selectedCitation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative max-w-4xl max-h-[80vh] w-full mx-4 bg-[#11121a] rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="text-xl font-semibold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Citation [{selectedCitation.citationNumber}]
              </h3>
              <button
                onClick={closeCitationModal}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {/* Highlighted Page Image */}
              {selectedCitation.page_img && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Relevant Content</h4>
                  <div className="bg-white rounded-lg p-4 shadow-inner">
                    <img 
                      src={`data:image/png;base64,${selectedCitation.page_img}`}
                      alt="Highlighted content from document"
                      className="max-w-full h-auto rounded border shadow-sm"
                    />
                  </div>
                </div>
              )}

              {/* Content Text */}
              {selectedCitation.content_text && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Content Text</h4>
                  <div className="bg-[#1a1b24] rounded-lg p-4 border border-white/10">
                    <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">
                      {selectedCitation.content_text}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end p-6 border-t border-white/10">
              <button
                onClick={closeCitationModal}
                className="px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-100 transition-all font-medium"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

