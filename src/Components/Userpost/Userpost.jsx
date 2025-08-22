import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Createcommentmodal from '../Createcommentmodal/Createcommentmodal'
import { Link } from 'react-router-dom'
import Useromment from './../Comment/Comment';
import Updatepost from './../Uploadpost/Uploadpost';
import toast from 'react-hot-toast'
export default function Userpost({id}) {
  const quee = useQueryClient()
  function getuserpost(){
    return axios.get(`https://linked-posts.routemisr.com/users/${id}/posts?limit=2`, {
      headers : {
        token : localStorage.getItem("userToken")
      }
    })
  }
  function deletepost(postid){
    return axios.delete(`https://linked-posts.routemisr.com/posts/${postid}`, {
      headers : {
        token : localStorage.getItem("userToken")
      }
    })
    .then((res) => {
      if(res.data.message == "success"){
        console.log(res);
        toast.success("Delete post is successfully")
        quee.invalidateQueries({queryKey : ["getuserpost"]})
      }
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.data.response.error)
    })
  }
  let {data, isLoading, isError, error} = useQuery({
    queryKey : ["getuserpost"],
    queryFn : getuserpost,
  })
  console.log(data?.data?.posts);
  
  return (
    <>
      {data?.data?.posts.map((post) => (
    
      <div key={post.id} className="w-full my-8 md:w-[80%] lg:w-[60%] rounded-md bg-slate-100 mx-auto">
        <Link to={`/postdetails/${post.id}`}>
        <div className="flex gap-4 items-center">
          <img src={post?.user.photo} className="size-[40px]"/>
          <p>{post?.user.name}</p>
        </div>
      
      {post?.body && <h2 className="mb-4 my-4">{post.body}</h2>}
      {post?.image && <img src={post?.image} className="w-full rounded-md" alt={post?.body}/>}
      
      </Link>
      {post.comments.length > 0 && <Useromment comment = {post?.comments[0]}/>}
      {data?.data?.posts && <Createcommentmodal postid={post.id}/>}
      <Updatepost id = {post?.id}/>
      <button className='bg-red-600 w-[30%] block mx-auto rounded-lg p-2' onClick={() => deletepost(post.id)}>Delete Post</button>
    </div> 
    ))}
    </>
  )
}
