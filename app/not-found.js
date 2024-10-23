import Link from 'next/link'
import React from 'react'
export const metadata = {
    title: "Notfound"
}

function NotFound() {
    return (
        <main className='min-h-screen flex justify-center items-center'>
            <div className='space-y-2'>
                <p className='text-5xl'>Not Found!</p>
                <p>This page is does't exist. <Link href={"/"} className='underline text-blue-500'>back to homepage</Link></p>
            </div>
        </main>
    )
}

export default NotFound
