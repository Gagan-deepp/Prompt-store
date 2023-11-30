'use client'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { motion } from 'framer-motion'

const Nav = () => {
  const { data: session } = useSession()
  const [provider, setProvider] = useState(null)
  useEffect(() => {
    const upProvider = async () => {
      const res = await getProviders();

      setProvider(res)
    }
    upProvider();
  }, [])
  return (
    <nav>
      <Link className='logo' href='/' >
        <Image src="/logo.jpg" height={30} width={100} />
        <p> Next</p>
      </Link>
      {session?.user ? (
        <div className='signedIn'>

          <div className="navBtns">
            <button onClick={signOut} > SignOut </button>
            <Link className='createBtn' href='/create-prompt' > Create Prompt </Link>
          </div>
          <Link href='/profile'>
            <Image src={session?.user.image}
              width={40}
              height={40}
              alt='profile' />
          </Link>
        </div>
      ) : (
        <>
          {provider &&
            Object.values(provider).map((provider) => (
              <motion.button
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.9}}
                type='button'
                key={provider.name}
                onClick={() => {
                  signIn(provider.id);
                }}
                className='signBtn px-5 py-1 rounded-full font-bold'
              >
                <p className='text-2xl' >
                  Sign in
                </p>
              </motion.button>
            ))}
        </>
      )}

    </nav>
  )
}

export default Nav