'use client'

import { LLMProvider } from '@app/api/chat/[llm]/route'
import { providers } from '@components/chat/ChatOptions'
import { useEffect, useState } from 'react'

type FrontentApiKey = {
  provider: string
  sensitive_id: string
}

export default function UserApiKeys() {
  const [apiKeys, setApiKeys] = useState([])

  const fetchApiKeys = async () => {
    const response = await fetch('/api/user/api-keys')
    const data = await response.json()
    setApiKeys(data)
  }

  useEffect(() => {
    fetchApiKeys()
  }, [])

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
