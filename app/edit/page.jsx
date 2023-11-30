'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Form from '@/components/Form'
import axios from 'axios'

const EditPrompt = () => {
    const [submit, setsubmit] = useState(false)
    const router = useRouter()
    const [post, setpost] = useState({
        prompt: '',
        tag: ''
    })
    const searchParamas = useSearchParams();
    const promptId = searchParamas.get('id');

    const updatePrompt = async (e) => {
        e.preventDefault();
        setsubmit(true);

        if (!promptId) {
            alert('Prompt ID not found ! Please try again')
        }

        try {
            const { data } = await axios.patch(`/api/prompt/${promptId}`, {
                prompt: post.prompt,
                tag: post.tag
            })

            if (data.success) {
                router.push("/")
            }
        }
        catch (error) {
            console.log(error)
        } finally {
            setsubmit(false)
        }
    }

    useEffect(() => {
        const getPrompt = async () => {
            const { data } = await axios.get(`api/prompt/${promptId}`);
            if (data.success) {
                setpost({
                    prompt: data.message.prompt,
                    tag: data.message.tag
                })
            }
        }
        if (promptId) getPrompt();
    }, [promptId])

    return (
        <Form
            type="Edit"
            post={post}
            setpost={setpost}
            submit={submit}
            handleSubmit={updatePrompt}
        />
    )
}

export default EditPrompt