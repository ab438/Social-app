import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import Comment from './../Comment/Comment';
export default function PostDetails() {
  let {id} = useParams()
  console.log(id);
  function getsinglepost(){
  return  axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
      headers : {
        token : localStorage.getItem("userToken")
      }
    })
  }
  let {data, isLoading, isError, error} = useQuery({
    queryKey : ["singlepost"],
    queryFn : getsinglepost,
    select : (data) => data?.data?.post
  })
  if(isError){
    return <p>{error.message}</p>
  }
  if(isLoading){
    return <span className="loader"></span>
  }
  return (
    <>
       <div key={data.id} className="w-full my-8 md:w-[80%] lg:w-[60%] rounded-md bg-slate-100 mx-auto">
           
        <div className="flex gap-4 items-center">
          <img src={data.user.photo} className="size-[40px]"/>
          <p>{data.user.name}</p>
        </div>
      
      {data.body && <h2 className="mb-4 my-4">{data.body}</h2>}
      {data.image && <img src={data.image} className="w-full rounded-md" alt={data.body}/>}
      {data?.comments.map((comment) => <Comment key={comment.id} comment={comment}/>)}
      </div> 
    </>
  )
}
