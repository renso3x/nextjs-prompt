"use client";

import { ChangeEvent, useEffect, useState } from "react";

import PromptCard from "./PromptCard";

const PrompCardList = ({ data, handleTagCLick }) => {
    return (
        <div className="mt-16 prompt_layout">
            {data.map((post, key) => (
                <PromptCard
                    key={key}
                    post={post}
                    handleTagCLick={handleTagCLick}
                />
            ))}
        </div>
    )
}

const Feed = () => {
    const [searchText, setSearchText] = useState('')
    const [posts, setPosts] = useState([])

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value)
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch('/api/prompt')
            const data = await res.json()
            setPosts(data)
        }
        fetchPosts()
    }, [])

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for a tag or a username"
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className="search_input peer"
                />
            </form>
            <PrompCardList
                data={posts}
                handleTagCLick={() => {}}
            />
        </section>
    )
}

export default Feed