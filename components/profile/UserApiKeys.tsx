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
      <table className="min-w-full text-sm divide-y divide-gray-200">
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
              <td className="px-4 py-2 whitespace-nowrap font-bold text-gray-900 dark:text-white">
                {providers[key.provider as LLMProvider].displayName}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-gray-500 dark:text-gray-300 font-mono">
                {key.sensitive_id}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

}
