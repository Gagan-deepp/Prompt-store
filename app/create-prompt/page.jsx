'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Form from '@/components/Form'
import axios from 'axios'

const CreatePrompt = () => {
  const [submit, setsubmit] = useState(false)
  const { data: seession } = useSession();
  const router = useRouter()
  const [post, setpost] = useState({
    prompt: '',
    tag: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    setsubmit(true);

    try {

      // const res = await fetch('/api/prompt/new',
      // {
      //   method:'POST',
      //   body:JSON.stringify({
      //     prompt: post.prompt,
      //     userId: seession?.user.id,
      //     tag: post.tag
      //   })
      // })

      // * Using axios
      
      const {data} = await axios.post('/api/prompt/new', {
        prompt: post.prompt,
        userId: seession?.user.id,
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
  return (
    <Form
      type="Create"
      post={post}
      setpost={setpost}
      submit={submit}
      handleSubmit={handleSubmit}
    />
  )
}

export default CreatePrompt