'use client'
import Image from 'next/image'

import React, { useState } from 'react'

import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from 'framer-motion'
import { ApiKey } from '@app/api/user/api-keys/route'
import { useRouter } from 'next/navigation'
import { LLMProvider } from '@app/api/chat/[llm]/route'

type ChatOptionsProps = {
  apiKeys?: ApiKey[]
  onSelectProvider: (provider: LLMProvider) => void
}

export const providers = {
  openai: {
    displayName: 'OpenAI',
    model: 'gpt-4o-mini',
  },
  anthropic: {
    displayName: 'Anthropic',
    model: 'claude-3-5-sonnet',
  },
  meta: {
    displayName: 'Meta',
    model: 'llama3-70b',
  },
  google: {
    displayName: 'Google',
    model: 'gemini-1.5-pro',
  },
  cohere: {
    displayName: 'Cohere',
    model: 'command-r-plus',
  },
  mistral: {
    displayName: 'Mistral',
    model: 'mistral-large-latest',
  },
}

export default function ChatOptions({
  apiKeys,
  onSelectProvider,
}: ChatOptionsProps) {
  const router = useRouter()

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const springConfig = { stiffness: 100, damping: 5 }

  const x = useMotionValue(0) // going to set this value on mouse move

  // rotate the tooltip
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig,
  )

  // translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig,
  )

  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2
    x.set(event.nativeEvent.offsetX - halfWidth) // set the x value, which is then used in transform and rotate
  }

  if (!apiKeys?.length) {
    return (
      <div className="mt-10 flex flex-col items-center justify-center gap-2">
        <p className="text-center text-gray-600 dark:text-gray-400">
          You don&apos;t have any API keys set up yet.
        </p>
        <button onClick={() => router.push('/profile')} className="rounded-full bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 p-0.5">
          <span className="flex w-full rounded-full bg-rose-50 px-5 py-1 text-black dark:bg-gray-900 dark:text-white">
            Add API Keys
          </span>
        </button>
      </div>
    )
  }

  return (
    <div className="my-10 flex w-full flex-row  items-center justify-center">
      {apiKeys.map((key, idx) => (
        <div
          className="group relative -mr-4"
          key={key.provider}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence mode="wait">
            {hoveredIndex === idx && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: 'spring',
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  translateX: translateX,
                  rotate: rotate,
                  whiteSpace: 'nowrap',
                }}
                className="absolute -left-1/2 -top-16 z-50 flex translate-x-1/2  flex-col items-center justify-center rounded-md bg-black px-4 py-2 text-xs shadow-xl"
              >
                <div className="absolute inset-x-10 -bottom-px z-30 h-px w-1/5 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
                <div className="absolute -bottom-px left-10 z-30 h-px w-2/5 bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
                <div className="relative z-30 text-base font-bold text-white">
                  {providers[key.provider].displayName}
                </div>
                <div className="text-xs text-white">
                  Model: {providers[key.provider].model}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div
            onMouseMove={handleMouseMove}
            className="relative !m-0 cursor-pointer rounded-full border-2 border-white bg-white object-cover object-top !p-0 transition duration-500 group-hover:z-30 group-hover:scale-105"
          >
            <Image
              onClick={() => onSelectProvider(key.provider)}
              height={80}
              width={80}
              src={`/assets/images/${key.provider}.png`}
              alt={`${key.provider} logo`}
              className="p-2"
            />
          </div>
        </div>
      ))}
    </div>
  )
}
