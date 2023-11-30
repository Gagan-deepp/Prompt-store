'use client'
import Image from 'next/image'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { LuClipboardList } from "react-icons/lu";
import { motion } from 'framer-motion'

const PromptC = ({ post, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const path = usePathname();
  const router = useRouter();
  const [copied, setcopied] = useState('')

  const handleCopy = () => {
    setcopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() => setcopied(''), 3000);
  }

  const handleProfiles = (post) => {
    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.name}`);
  }

  return (
    <div className='promptCard'>
      <div className='promptDiv'>

        <div className='creatorDetail cursor-pointer'
          onClick={() => handleProfiles(post)}
        >
          <Image
            src={post.creator.image}
            alt='user_image'
            width={50}
            height={50}
            className='img'
          />

          <div className="creatorInfo">
            <h3> {post.creator.name} </h3>
            <p className='text-sm' > {post.creator.email} </p>
          </div>
        </div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="copy_btn" onClick={() => { handleCopy() }}>
          <LuClipboardList />
        </motion.div>
      </div>

      <p>
        {post.prompt}
      </p>

      <p className='tag'>
        {post.tag}
      </p>

      {session?.user.id === post.creator._id && path === '/profile' && (
        <div className="postBtn">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleEdit}
          >
            Edit
          </motion.button>

          <motion.p
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleDelete}
          >
            Delete
          </motion.p>
        </div>
      )}
    </div>
  )
}

export default PromptC