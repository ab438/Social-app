import React from 'react'
import Updatecomment from './../Updatecomment/Updatecomment';
import Deletecomment from './../Deletecomment/Deletecomment';

export default function Useromment({ comment }) {
  // Apply safe destructuring with defaults
  let { commentCreator = {}, content = '', createdAt = '', _id = '' } = comment || {};

  console.log(comment);

  return (
    <>
      <div className='w-full bg-slate-500 rounded-md border-2 border-slate-900 text-black'>
        <div className='flex justify-between items-center'>
          <div className='flex gap-2 p-2'>
            <img
              src={commentCreator?.photo || '/default-avatar.png'} // fallback image
              alt="User"
              className='size-[36px]'
            />
            <p>{commentCreator?.name || 'Unknown User'}</p>
          </div>
          <div>
            <span>{createdAt || 'Unknown Date'}</span>
          </div>
        </div>
        <p className='px-3'>
          <span className='text-white'>Comment is :</span> {content || 'No content'}
        </p>
      </div>
      <div className='my-3 p-4 bg-slate-300 flex flex-col gap-3'>
        <button className='bg-yellow-500 p-2 rounded-md w-[50%] mx-auto cursor-pointer'>
          <Updatecomment id={_id} />
        </button>
        <button className='bg-red-500 p-2 rounded-md w-[50%] mx-auto cursor-pointer'>
          <Deletecomment id={_id} />
        </button>
      </div>
    </>
  )
}
