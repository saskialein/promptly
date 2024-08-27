'use client'

import { Prompt, PromptList } from '@components/prompts/Feed'
import Modal from '@components/ui/Modal'
import React, { useState } from 'react'
import { ApiKeysForm } from './APIKeysForm'
import PromptCard from '@components/prompts/PromptCard'
import UserApiKeys from './UserApiKeys'

export type ProfileProps = {
  name: string | null
  desc: string
  data: PromptList
  handleEditPrompt?: (post: Prompt) => void
  handleDeletePrompt?: (post: Prompt) => void
  handleDeleteAccount?: () => void
  showApiKeysForm?: boolean
}

export default function Profile({
  name,
  desc,
  data,
  handleEditPrompt,
  handleDeletePrompt,
  handleDeleteAccount,
  showApiKeysForm,
}: ProfileProps) {
  const [isModalOpen, setModalOpen] = useState(false)

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="purple_gradient">{name} Profile</span>
      </h1>

      <p className="desc text-left">{desc}</p>
      <div className="mt-4 flex justify-end space-x-4">
        {handleDeleteAccount && (
          <button onClick={handleDeleteAccount} className="delete_btn">
            Delete Profile
          </button>
        )}
        {showApiKeysForm && (
          <>
            <button onClick={() => setModalOpen(true)} className="outline_btn">
              LLM API Keys
            </button>
            <Modal
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
              title="Your API Keys"
            >
              <div className='flex flex-col gap-4'>
                <UserApiKeys />
                <ApiKeysForm closeModal={() => setModalOpen(false)} />
              </div>
            </Modal>
          </>
        )}
      </div>
      <div className="prompt_layout mt-10">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={handleEditPrompt}
            handleDelete={handleDeletePrompt}
          />
        ))}
      </div>
    </section>
  )
}
