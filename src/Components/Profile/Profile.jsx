import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Userpost from '../Userpost/Userpost'
import Changepassword from './../Changepassword/Changepassword';
import Uploadphoto from './../Uploadphoto/Uploadphoto';
export default function Profile() {
  function getprofile(){
    return axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
      headers : {
        token : localStorage.getItem("userToken")
      }
    })
  }
  let {data} = useQuery({
    queryKey : ["getprofile"],
    queryFn : getprofile,
    select : (data) => data?.data?.user
  })
  console.log(data);
  
  return (
    <>
      <div className='w-full md:w-[80%] my-9 lg:w-[60%] text-center mx-auto border-2 border-slate-800 rounded-lg p-4'>
        <img src={data?.photo} className='size-[50px] mx-auto' alt="" />
        <p>Name : {data?.name}</p>
        <p>Created At : {data?.createdAt}</p>
        <p>Date of Birth : {data?.dateOfBirth}</p>
        <p>Gender : {data?.gender}</p>
        <p>Email : {data?.email}</p>
      </div>
      <div className='w-full md:w-[80%] lg:w-[60%] border-2 border-slate-800 rounded-lg d-block mx-auto text-center p-4'>
        <Changepassword/>
        <Uploadphoto/>
      </div>
      {data && <Userpost id={data?._id}/>}
    </>
  )
}
