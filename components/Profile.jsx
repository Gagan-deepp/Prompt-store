import React from 'react'
import PromptC from './PromptC'

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className='container' >
      <h1 className='heading'> {name}'s Profile </h1>

      <p> {desc} </p>

      <div className='cardDiv'>
        {data.map((post, index) => (
          <div key={index} className='cardMap'>
            <PromptC
              key={index}
              post={post}
              handleEdit = { () => handleEdit && handleEdit(post)}
              handleDelete = { () => handleDelete && handleDelete(post)}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Profile