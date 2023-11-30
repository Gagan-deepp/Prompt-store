'use client'
import Profile from '@/components/Profile';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const UserProfile = ({ params }) => {
    const [post, setPost] = useState([])
    const userParamas = useSearchParams();
    const userName = userParamas.get('name');

    useEffect(() => {
        const getPost = async () => {
            const { data } = await axios.get(`/api/users/${params?.id}/posts`);
            if (data.success) {
                setPost(data.posts);
            }
        }

        if (params?.id) getPost();
    },[params?.id])

    return (
        <Profile
            name={userName}
            desc={`Welcome to ${userName} profile`}
            data={post}
        />
    )
}

export default UserProfile