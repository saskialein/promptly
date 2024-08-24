'use client'
import { ChangeEvent, FormEvent, useState } from 'react'
import { TrashIcon, PlusCircleIcon } from '@heroicons/react/24/outline'

type ApiKeysFormProps = {
  closeModal: () => void
}

export function ApiKeysForm({ closeModal }: ApiKeysFormProps) {
  const [apiKeys, setApiKeys] = useState([{ provider: '', apiKey: '' }])

  const handleInputChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const values = [...apiKeys];
    const name = event.target.name as keyof typeof values[number];
    values[index][name] = event.target.value;
    setApiKeys(values);
  }

  const handleAddFields = () => {
    setApiKeys([...apiKeys, { provider: '', apiKey: '' }])
  }

  const handleRemoveFields = (index: number) => {
    const values = [...apiKeys]
    if (values.length === 1) {
      values[index].provider = ''
      values[index].apiKey = ''
    } else {
      values.splice(index, 1)
    }
    setApiKeys(values)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      const response = await fetch('/api/user/update/api-keys', {
        method: 'PATCH',
        body: JSON.stringify({ apiKeys }),
      })

      if (response.ok) {
        alert('API keys updated successfully!')
        closeModal()
      }
    } catch (error) {
      console.error('Error updating API keys:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {apiKeys.map((field, index) => (
        <div key={index} className="flex flex-center space-x-4">
          <select
            name="provider"
            value={field.provider}
            onChange={(event) => handleInputChange(index, event)}
            className="select_input"
          >
            <option value="">Select Provider</option>
            <option value="openai">OpenAI</option>
            <option value="anthropic">Anthropic</option>
            <option value="llama">LLAMA</option>
          </select>
          <input
            name="apiKey"
            placeholder="API Key"
            value={field.apiKey}
            onChange={(event) => handleInputChange(index, event)}
            className="form_input"
          />
          <button
            type="button"
            onClick={() => handleRemoveFields(index)}
            className="p-2 rounded-full hover:bg-red-500/30 focus:outline-none"
          >
            <TrashIcon className="h-5 w-5 text-white" />
          </button>
        </div>
      ))}
      <div className="flex flex-between mt-4">
        <button
          type="button"
          onClick={handleAddFields}
          className="p-2 rounded-full hover:bg-green-500/30 focus:outline-none"
        >
          <PlusCircleIcon className="h-8 w-8 text-white" />
        </button>
        <button
          type="submit"
          className="green_gradient cursor-pointer font-inter text-md"
        >
          Update
        </button>
      </div>
    </form>
  )
}
