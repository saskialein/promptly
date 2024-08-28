'use client'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Prompt } from './Feed'
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline'
import { usePrompt } from '@context/PromptContext'

export type PromptCardProps = {
  post: Prompt
  handleTagClick?: (tag: string) => void
  handleEdit?: (post: Prompt) => void
  handleDelete?: (post: Prompt) => void
}

export default function PromptCard({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}: PromptCardProps) {
  const { data: session } = useSession()
  const pathName = usePathname()
  const router = useRouter()
  const { setPrompt } = usePrompt()

  const [copied, setCopied] = useState('')
  const [tooltipVisible, setTooltipVisible] = useState(false)

  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push('/profile')
    router.push(`/profile/${post?.creator?._id}?name=${post.creator.username}`)
  }

  const handleCopy = () => {
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() => setCopied(''), 3000)
  }

  const handleBubbleClick = (post: Prompt) => {
    setPrompt(post.prompt)
  }

  return (
    <div className="prompt_card">
      <div className="flex items-start justify-between gap-5">
        <div
          className="flex flex-1 cursor-pointer items-center justify-start gap-3"
          onClick={handleProfileClick}
        >
          {/* TODO: Fallback img */}
          <Image
            src={post?.creator?.image || ''}
            alt="user-image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-syne font-semibold text-gray-900 dark:text-gray-300">
              {post?.creator?.username}
            </h3>
            {/* <p className="font-inter text-sm text-gray-500 ">
              {post?.creator?.email}
            </p> */}
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post?.prompt
                ? '/assets/icons/tick.svg'
                : '/assets/icons/copy.svg'
            }
            width={15}
            height={15}
            alt="Copied icon"
          />
        </div>
      </div>
      <p className="my-4 font-syne text-sm text-gray-700 dark:text-gray-300">
        {post?.prompt}
      </p>
      <div className="flex-between flex">
        <p
          className="orange_gradient cursor-pointer font-inter text-sm"
          onClick={() => handleTagClick && handleTagClick(post?.tag)}
        >
          {post?.tag}
        </p>
        <div
          className="group relative"
          onMouseEnter={() => setTooltipVisible(true)}
          onMouseLeave={() => setTooltipVisible(false)}
        >
          <button onClick={() => handleBubbleClick(post)}>
            <ChatBubbleOvalLeftEllipsisIcon className="size-6 dark:text-white" />
          </button>
          {tooltipVisible && (
            <div className="orange_gradient absolute bottom-full left-1/2 hidden w-max -translate-x-1/2 whitespace-nowrap rounded text-sm group-hover:block">
              Paste prompt into chat
            </div>
          )}
        </div>
      </div>
      {session?.user.id === post?.creator?._id && pathName === '/profile' && (
        <div className="flex-end mt-5 gap-4 border-t border-gray-100 pt-3">
          <p
            className="green_gradient cursor-pointer font-inter text-sm"
            onClick={() => handleEdit && handleEdit(post)}
          >
            Edit
          </p>
          <p
            className="orange_gradient cursor-pointer font-inter text-sm"
            onClick={() => handleDelete && handleDelete(post)}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  )
}
