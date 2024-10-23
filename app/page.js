"use client";
import React, { useState } from 'react'
import Link from 'next/link';
import { BsEye, BsEyeSlash, BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import axios from 'axios';

function homepage() {
  const [pwdVisible, setPwdVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    setUser(prev => ({ ...prev, [name]: e.target.value }))
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api", { email: user.email, password: user.password })
        .then(res => {
          console.log(res.data.message);
          setUser({ email: "", password: "" });
        })
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      <main className='min-h-screen p-5 md:py-10 md:px-20 dark:bg-gray-800 dark:text-white'>
        <section>
          <nav className='flex items-center justify-between'>
            <h1 className='text-teal-600 font-bold text-xl md:text-3xl'>Phishing.</h1>
            <div className='flex gap-4 items-center'>
              {darkMode ? <BsSunFill className='cursor-pointer text-lg md:text-2xl' onClick={() => setDarkMode(prev => !prev)} /> : <BsMoonStarsFill className='cursor-pointer text-lg md:text-2xl' onClick={() => setDarkMode(prev => !prev)} />}
              <Link href="/admin" className='text-white bg-gradient-to-r from-teal-600 to-teal-200 px-2 py-[2px] md:px-4 md:py-1 rounded'>Admin</Link>
            </div>
          </nav>
        </section>
        <section>
          <div className='pt-20 pb-10 text-center mx-auto md:max-w-[50%]'>
            <h1 className='text-teal-500 py-20 pb-8  text-3xl md:text-4xl'>Login to phishing</h1>
            <form onSubmit={submitHandler} className='shadow rounded p-5 flex flex-col'>
              <input value={user.email} name='email' onChange={onChangeHandler} type="email" className='py-1 px-2 mb-4 border-2 dark:bg-gray-800 dark:border-gray-500 dark:focus-within:border-white rounded dark:outline-none md:text-lg' placeholder='Email' />
              <div className='relative flex'>
                <input value={user.password} name='password' onChange={onChangeHandler} type={pwdVisible ? "text" : "password"} className='flex-1 px-2 pr-8 py-1 border-2 dark:bg-gray-800 rounded dark:outline-none dark:border-gray-500 dark:focus-within:border-white md:text-lg' placeholder='Password' />
                {pwdVisible ? <BsEye className='cursor-pointer absolute right-2 top-1/4' onClick={() => setPwdVisible(prev => !prev)} /> : <BsEyeSlash className='cursor-pointer absolute right-2 top-1/4' onClick={() => setPwdVisible(prev => !prev)} />}
              </div>
              <button className='w-full mt-4 bg-teal-400 rounded py-1 mb-1 text-white font-medium text-xl'>Login</button>
              <p className='pt-2 md:text-base'>Forgot password? <span className='underline text-teal-500 cursor-pointer'>click here</span></p>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}

export default homepage;
