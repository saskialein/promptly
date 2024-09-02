'use client'

import { LLMProvider } from '@app/api/chat/[llm]/route'
import { usePrompt } from '@context/PromptContext'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { useChat } from 'ai/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'


type ChatInterfaceProps = {
  provider: LLMProvider
}

export default function ChatInterface({ provider }: ChatInterfaceProps) {
  const { messages, input, setInput, handleInputChange, handleSubmit, error } =
    useChat({
      api: `/api/chat/${provider}`,
    })
  const { prompt, setPrompt } = usePrompt()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (prompt || prompt.length > 1) {
      setInput(prompt)
      setTimeout(() => {
        textareaRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [prompt])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }

    if (prompt && input.length == 0) {
      setPrompt('')
    }
  }, [input])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const hasMessages = messages.length > 0

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        e.preventDefault()
        setInput(input + '\n')
      } else {
        e.preventDefault()
        handleSubmit(e)
        setPrompt('')
      }
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col">
      <AnimatePresence>
        {hasMessages && (
          <motion.div
            className="grow overflow-y-auto rounded-t-lg bg-white/5 p-4 shadow-md"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex max-h-[500px] flex-col gap-3 overflow-y-auto">
              {error && <p className="dark:text-white">{error.message}</p>}
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex items-start gap-2 dark:text-white ${
                    m.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <span
                    className={`font-semibold leading-6 ${
                      m.role === 'user' ? 'green_gradient' : 'orange_gradient'
                    }`}
                  >
                    {m.role === 'user' ? 'You: ' : 'AI: '}
                  </span>
                  <div className="prose inline-block max-w-[80%] break-words dark:prose-invert">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw] as any}
                    >
                      {m.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <form onSubmit={handleSubmit} className="relative w-full">
          <textarea
            ref={textareaRef}
            className="search_input resize-none"
            value={input}
            placeholder="Paste a prompt or just chat..."
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            rows={1}
          />{' '}
          <div>
            <button
              onClick={handleSubmit}
              className="send_button absolute bottom-2 right-2"
            >
              <PaperAirplaneIcon className="size-4" />
            </button>
          </div>
      </form>
    </div>
  )
}
