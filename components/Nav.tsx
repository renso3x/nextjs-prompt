"use client"

import { getProviders, signIn, signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from "react"

import Image from "next/image"
import Link from "next/link"

const Nav = () => {
    const { data: session } = useSession()

    const [providers, setProviders] = useState(null)
    const [toggleDropDown, setToggleDropDown] = useState(false)

    useEffect(() => {
        const fetchProviders = async () => {
            const response = await getProviders();
            setProviders(response)
        }

        fetchProviders();
    }, [])

    return (
       <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className="flex gap-2 flex-centr">
                <Image
                    alt="Promptopia logo"
                    src="/assets/images/logo.svg"
                    width={30}
                    height={30}
                    className="object-contain"
                />
                <p className="logo_text">Promptopia</p>
            </Link>

            {/* Mobile Nav */}
            <div className="sm:flex hidden">
                {
                    session?.user ?
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-prompt" className="black_btn">Create Post
                        </Link>
                        <button
                            type="button"
                            onClick={() => signOut()}
                            className="outline_btn"
                        >
                            Sign out
                        </button>

                        <Link href="/profile">
                            <Image
                                src={session?.user.image}
                                width={37}
                                height={37}
                                className="rounded-full"
                                alt="profile"
                            />
                        </Link>

                    </div> :
                    <>
                        {
                            providers &&
                            Object.values(providers).map((
                                provider
                            ) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className='black_btn'
                                >
                                    Sign In
                                </button>
                            ))
                        }
                    </>
                }

            </div>

            {/* Mobile Nav */}

            <div className="sm:hidden flex relative">
                {
                    session?.user ? (
                        <div className='flex'>
                            <Image
                                src={session?.user.image}
                                width={37}
                                height={37}
                                className="rounded-full"
                                alt="profile"
                                onClick={() => setToggleDropDown((prevState) => !prevState)}
                            />

                            {toggleDropDown && (
                                <div className='dropdown'>
                                    <Link href='/profile'
                                        className='dropdown_link'
                                        onClick={() => setToggleDropDown(false)}
                                    >
                                        My Profile
                                    </Link>
                                    <Link href='/create-prompt'
                                        className='dropdown_link'
                                        onClick={() => setToggleDropDown(false)}
                                    >
                                        Create Prompt
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setToggleDropDown(false)
                                            signOut()
                                        }}
                                        className='mt-5 w-full black_btn'
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) :
                    <>
                        {
                            providers &&
                            Object.values(providers).map((
                                provider
                            ) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className='black_btn'
                                >
                                    Sign In
                                </button>
                            ))
                        }
                    </>
                }

            </div>
       </nav>
    )
}

export default Nav