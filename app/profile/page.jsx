'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Profile from '@/components/Profile'
import axios from 'axios'

const Myprofile = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [post, setPost] = useState([])

    useEffect(() => {
        const getPost = async () => {
            const { data } = await axios.get(`/api/users/${session?.user.id}/posts`);
            if (data.success) {
                setPost(data.posts);
            }
        }

        if (session?.user.id) getPost();
    }, [])

    const handleEdit = (post) => {
        router.push(`/edit?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        const hasConfirm = confirm("Are you sure ??")
        if (hasConfirm) {
            try {
                const { data } = await axios.delete(`/api/prompt/${post._id}`)

                if (data.success) {
                    alert(" Prompt Deleted SuccessFully ! ")
                    router.push("/")
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <Profile
            name={session?.user.name}
            desc="Welcome to my profile"
            data={post}
            handleEdit={ handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default Myprofile