'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ApiKey } from '@app/api/user/api-keys/route'
import ChatOptions, { providers } from './ChatOptions'
import ChatInterface from './ChatInterface'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { LLMProvider } from '@app/api/chat/[llm]/route'
import { useSession } from 'next-auth/react'

export default function Chat() {
  const router = useRouter()
  const { data: session } = useSession()

  const [apiKeys, setApiKeys] = useState([])
  const [selectedProvider, setSelectedProvider] = useState<LLMProvider | null>(
    null,
  )
  const [showProviderOptions, setShowProviderOptions] = useState(false)

  const fetchApiKeys = async () => {
    const response = await fetch('/api/user/api-keys')
    const data = await response.json()
    setApiKeys(data)
  }

  useEffect(() => {
    fetchApiKeys()
  }, [])

  const handleProviderSelection = (provider: LLMProvider) => {
    setSelectedProvider(provider)
    setShowProviderOptions(false)
  }

  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  }

  if (!session) {
    return null
  }

  return (
    <section className="chat">
      <h2 className="mb-2 text-center font-syne text-2xl font-semibold text-gray-900 dark:text-gray-300">
        Have a chat with your favourite LLM!
      </h2>
      {!selectedProvider ? (
        <ChatOptions
          apiKeys={apiKeys}
          onSelectProvider={handleProviderSelection}
        />
      ) : (
        <div className="relative flex w-full max-w-4xl items-end gap-2">
          <div className="relative shrink-0">
            <button
              onClick={() => setShowProviderOptions(!showProviderOptions)}
              className="small_llm_provider_button"
            >
              <Image
                src={`/assets/images/${selectedProvider}.png`}
                alt={`${selectedProvider} logo`}
                width={26}
                height={26}
              />
            </button>
            {showProviderOptions && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={dropdownVariants}
                className="absolute bottom-full left-0 z-10 mb-4 w-40 rounded border border-gray-200 bg-white shadow-lg"
              >
                <div className="absolute left-[10%] [bottom:-8px]">
                  <div className="size-0 border-x-8 border-t-8 border-x-transparent border-t-white"></div>
                </div>
                {apiKeys.map((key: ApiKey) => (
                  <button
                    key={key.provider}
                    onClick={() => handleProviderSelection(key.provider)}
                    className="hover:purple_gradient block w-full px-4 py-2 text-left text-gray-700"
                  >
                    <Image
                      src={`/assets/images/${key.provider}.png`}
                      alt={`${key.provider} logo`}
                      height={20}
                      width={20}
                      className="mr-2 inline-block"
                    />
                    {providers[key.provider as LLMProvider].displayName}
                  </button>
                ))}
                <button
                  onClick={() => router.push('/profile')}
                  className="hover:purple_gradient block w-full px-4 py-2 text-left text-gray-700"
                >
                  <div className="flex items-center gap-2">
                    <PlusCircleIcon className="size-5 text-black" />
                    Add LLM
                  </div>
                </button>
              </motion.div>
            )}
          </div>
          <div className="w-full">
            <ChatInterface provider={selectedProvider} />
          </div>
        </div>
      )}
    </section>
  )
}
