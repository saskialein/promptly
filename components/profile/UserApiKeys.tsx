'use client'

import { LLMProvider } from '@app/api/chat/[llm]/route'
import { providers } from '@components/chat/ChatOptions'
import { useEffect, useState } from 'react'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'

type FrontentApiKey = {
  provider: string
  sensitive_id: string
}

export default function UserApiKeys() {
  const [apiKeys, setApiKeys] = useState([])
  const [tooltipVisible, setTooltipVisible] = useState(false)

  const fetchApiKeys = async () => {
    const response = await fetch('/api/user/api-keys')
    const data = await response.json()
    setApiKeys(data)
  }

  useEffect(() => {
    fetchApiKeys()
  }, [])

  if (!apiKeys || apiKeys.length == 0) {
    return (
      <div className="mt-2 flex items-center gap-2">
        <p className="text-sm italic text-gray-700 dark:text-gray-300">
          Add your API keys to start chatting.
        </p>
        <div
          className="group relative flex items-center"
          onMouseEnter={() => setTooltipVisible(true)}
          onMouseLeave={() => setTooltipVisible(false)}
        >
          <button type="button">
            <QuestionMarkCircleIcon className="size-6 dark:text-white" />
          </button>
          {tooltipVisible && (
            <div className="green_gradient absolute bottom-full left-1/2 hidden w-max -translate-x-1/2 whitespace-nowrap rounded text-sm group-hover:block">
              Help coming soon!
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-300">
              Provider
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-300">
              API Key
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {apiKeys.map((key: FrontentApiKey) => (
            <tr key={key.provider}>
              <td className="whitespace-nowrap px-4 py-2 font-bold text-gray-900 dark:text-white">
                {providers[key.provider as LLMProvider].displayName}
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-mono text-gray-500 dark:text-gray-300">
                {key.sensitive_id}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
