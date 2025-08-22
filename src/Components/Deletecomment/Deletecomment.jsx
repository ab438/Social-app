import React from 'react'
import  axios  from 'axios';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
export default function Deletecomment({id}) {
  const q = useQueryClient()
  function handledeletecomment(){
    axios.delete(`https://linked-posts.routemisr.com/comments/${id}`,{
      headers : {
        token : localStorage.getItem("userToken")
      }
    })
    .then((res) => {
      if(res.data.message == "success"){
        console.log(res);
        toast.success("Delete comment is done successfully")
        q.invalidateQueries({queryKey : ["getuserpost"]})
        q.invalidateQueries({queryKey : ["getprofile"]})
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }
  return (
    <button onClick={handledeletecomment}>Delete Comment</button>
  )
}
