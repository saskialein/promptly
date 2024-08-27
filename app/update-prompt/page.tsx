'use client'

import PromptForm from '@components/prompts/PromptForm'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, Suspense, useEffect, useState } from 'react'

export default function EditPrompt() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  })
  const [promptId, setPromptId] = useState<string | null>(null)

  useEffect(() => {
    setPromptId(searchParams.get('id'))
  }, [searchParams])

  useEffect(() => {
    const getPromptDetails = async () => {
      if (!promptId) return

      const response = await fetch(`/api/prompt/${promptId}`)
      const data = await response.json()

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      })
    }

    if (promptId) getPromptDetails()
  }, [promptId])

  const updatePrompt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)

    if (!promptId) return alert('Prompt ID not found')

    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      })
      if (res.ok) {
        router.push('/')
      }
    } catch (err) {
      console.log(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Suspense fallback="Loading...">
      <PromptForm
        type="Edit"
        post={post}
        setPost={setPost}
        handleSubmit={updatePrompt}
        submitting={submitting}
      />
    </Suspense>
  )
}
