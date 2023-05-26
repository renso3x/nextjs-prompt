"use client"

import { useEffect, useState } from "react"

import PromptCard from "./PromptCard"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

const Profile = ({
    name,
    desc,
    data,
    handleEdit,
    handleDelete
}) => {
    return (
        <div className="w-full">
            <h1 className="head_text text-left">
                <span className="blue_gradient">{name} </span>Profile
            </h1>

            <p className="desc text-left">{desc}</p>
            <div className="mt-16 prompt_layout">
                {data.map((post, key) => (
                    <PromptCard
                        key={key}
                        post={post}
                        handleEdit={() => handleEdit && handleEdit(post)}
                        handleDelete={() => handleDelete && handleDelete(post)}
                    />
                ))}
            </div>
        </div>

    )
}

export default Profile