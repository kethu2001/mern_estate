import React from 'react'
import { useSelector } from 'react-redux'

export default function () {
  const { currentUser } = useSelector(state => state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <div className='bg-slate-300 p-8 shadow-md rounded-md'>
        <form className='flex flex-col gap-4'>
          <img src={currentUser.avatar} alt='profile' className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
          <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username'  />
          <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email'  />
          <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password'  />
          <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>update</button>
        </form>
        <div className='flex justify-between mt-5'>
          <span className='text-red-700 cursor-pointer'>Delete account</span>
          <span className='text-red-700 cursor-pointer'>Sign out</span>
        </div>
      </div>
    </div>
  )
}
