'use client'
import axios from 'axios';
import { useState, useEffect } from 'react'
import PromptC from './PromptC';

const PromptCardList = ({ data }) => {
    return (
        <div className='cardDiv'>
            {data.map((post, index) => (
                <div key={index} className='cardMap'>
                    <PromptC
                        key={index}
                        post={post}
                    />
                </div>
            ))}
        </div>
    )
}

const Feed = () => {
    const [search, setsearch] = useState("");
    const [prompt, setprompt] = useState([]);
    const [searchedPrompt, setSearchedPrompt] = useState([])

    const filterSearch = (searchText) => {
        const regex = new RegExp(searchText, "i")
        return prompt.filter(
            (item) =>
                regex.test(item.creator.name) ||
                regex.test(item.tag) ||
                regex.test(item.prompt)
        )
    }

    const handleSearch = (e) => {
        setsearch(e.target.value)

        const searchItem = filterSearch(e.target.value)
        setSearchedPrompt(searchItem)
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
                    onChange={(e) => handleSearch(e)}
                    required
                    placeholder='Search Prompt or User'
                />
            </form>

            {search ?
                (<PromptCardList
                    data={searchedPrompt} />)
                : (
                    <>
                    <PromptCardList
                        data={prompt}
                    />
                    </>)
            }
        </section>
    )
}

export default Feed