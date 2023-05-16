
"use client"

import Form from '../../components/Form'
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
import { useState } from 'react'

export interface Post {
    prompt: string,
    tag: string
}

const CreatePrompt = () => {
    const router = useRouter();
    const { data: session } = useSession()
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState<Post>({
        prompt: '',
        tag: ''
    })

    const createPrompt = async (e: HTMLFormElement) => {
        e.preventDefault()
        setSubmitting(true)

        try {
            const response = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                    userId: session?.user.id,
                    prompt: post.prompt,
                    tag: post.tag
                })
            })

            if (response.ok) {
                router.push('/')
            }
        } catch (err) {
            console.log(err)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Form
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    )
}

export default CreatePrompt;