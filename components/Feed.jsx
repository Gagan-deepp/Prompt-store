'use client'
import axios from 'axios';
import { useState, useEffect } from 'react'
import PromptC from './PromptC';

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className='cardDiv'>
            {data.map((post, index) => (
                <div key={index} className='cardMap'>
                    <PromptC
                        key={index}
                        post={post}
                        handleTagClick={handleTagClick}
                    />
                </div>
            ))}
        </div>
    )
}

const Feed = () => {
    const [search, setsearch] = useState("");
    const [prompt, setprompt] = useState([])

    const handleSearch = (e) => {

    }

    const handleTagClick = () => {

    }

    useEffect(() => {
        const getPrompts = async () => {
            const { data } = await axios.get('/api/prompt');
            if (data.success) {
                setprompt(data.prompts);
            }
        }

        getPrompts();
    }, [])

    return (
        <section className='feedSection'>
            <form  >
                <input
                    className='input'
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    required
                    placeholder='Search Prompt or User'
                />
            </form>

            <PromptCardList
                data={prompt}
                handleTagClick={handleTagClick}
            />
        </section>
    )
}

export default Feed