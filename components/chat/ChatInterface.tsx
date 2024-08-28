'use client'

import { LLMProvider } from '@app/api/chat/[llm]/route'
import { usePrompt } from '@context/PromptContext'
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
  const { prompt } = usePrompt()

  useEffect(() => {
    if (prompt || prompt.length > 1) {
      setInput(prompt)
    }
  }, [prompt])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const hasMessages = messages.length > 0

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
            <div className="flex max-h-[500px] flex-col gap-2 overflow-y-auto">
              {error && <p className="dark:text-white">{error.message}</p>}
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex items-start gap-2 dark:text-white ${
                    m.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <span
                    className={`font-semibold ${
                      m.role === 'user' ? 'green_gradient' : 'orange_gradient'
                    }`}
                  >
                    {m.role === 'user' ? 'You: ' : 'AI: '}
                  </span>
                  <div className="inline-block max-w-[80%] break-words">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={{
                        pre({ children, ...props }) {
                          return (
                            <pre className="code_block" {...props}>
                              {children}
                            </pre>
                          )
                        },
                        code({ children, ...props }) {
                          return (
                            <pre className="code_block">
                              <code {...props}>{children}</code>
                            </pre>
                          )
                        },
                        ul({ children, ...props }) {
                          return (
                            <ul className="ml-5 list-disc" {...props}>
                              {children}
                            </ul>
                          )
                        },
                        ol({ children, ...props }) {
                          return (
                            <ol className="ml-5 list-decimal" {...props}>
                              {children}
                            </ol>
                          )
                        },
                        li({ children, ...props }) {
                          return (
                            <li className="ml-2" {...props}>
                              {children}
                            </li>
                          )
                        },
                      }}
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
      <form onSubmit={handleSubmit} className="flex-center w-full ">
        <input
          className="search_input "
          value={input}
          placeholder="Paste a prompt or just chitchat with the bot..."
          onChange={handleInputChange}
          type="text"
        />
      </form>
    </div>
  )
}
