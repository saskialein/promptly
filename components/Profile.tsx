'use client'

import React, { useState } from 'react'
import PromptCard from './PromptCard'
import { Prompt, PromptList } from './Feed'
import Modal from './Modal'
import { ApiKeysForm } from './APIKeysForm'

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
      <div className="flex justify-end space-x-4 mt-4">
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
              title="Add your API Keys"
            >
              <ApiKeysForm closeModal={() => setModalOpen(false)} />
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
