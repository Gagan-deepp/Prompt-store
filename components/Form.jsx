import Link from 'next/link'
import React from 'react'

const Form = ({ type, post, setpost, submit, handleSubmit }) => {
  return (
    <section className='formCont container' >
      <h3 className='heading' > {type} Your Prompt </h3>

      <form className='form' onSubmit={handleSubmit}>
        <label htmlFor="promptArea">
          Enter Your AI Prompt
        </label>

        <textarea name="promptArea" id="promptArea"
          className='border-black'
          value={post.prompt}
          onChange={(e) => setpost({ ...post, prompt: e.target.value })}
          placeholder='Enter Your Prompt'
          required
        />

        <label htmlFor="tagField">
          Tag : #product #web #ui
        </label>

        <input
          className='border-black'
          name="tagField" id="tagField"
          value={post.tag}
          onChange={(e) => setpost({ ...post, tag: e.target.value })}
          placeholder='#tag...'
          required
        />

        <div className="formBtns">
          <button type='submit' disabled={submit}> {submit ? `${type}...` : type} </button>
          <Link href="/"> Cancel </Link>
        </div>
      </form>
    </section>
  )
}

export default Form