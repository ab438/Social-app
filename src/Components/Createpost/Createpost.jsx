import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast';
export default function Createpost() {
  const form = useForm({
    defaultValues : {
      body : "",
      image : ""
    }
  })
  let {register , handleSubmit} = form
  async function handlecreate(values){
    const Data = new FormData()
    Data.append("body",values.body)
    Data.append("image",values.image[0])
    console.log(Data);
    
    try{
      let response = await axios.post("https://linked-posts.routemisr.com/posts", Data, {
      headers : {
        token : localStorage.getItem("userToken")
      }
      })
      if(response.data.message == "success"){
        toast.success("Post is sent successfully")
      }
    }catch(err){
      toast.error(err.response.data.error)
      
    }
  }
  return (
    <>
      <div className='w-full mx-auto my-12 rounded-lg p-4 bg-slate-200 md:w-[60%] lg:w-[80%]'>
        <form onSubmit={handleSubmit(handlecreate)}>
          <div>
            <input type="text" {...register("body")} className='border-4 border-slate-400 rounded-lg w-full p-4'/>
          </div>
          <div className='my-4'>
            <label htmlFor='photo' className='w-full bg-red-500 block p-4 text-center cursor-pointer'>
              <i class="fa-solid fa-image fa-2xl" ></i>
            </label>
            <input type="file" {...register("image")} id='photo' hidden />
          </div>
          <div>
            <button className='bg-blue-600 w-full mx-auto p-4 rounded-lg cursor-pointer text-white'>Add Post</button>
          </div>
        </form>
      </div>
    </>
  )
}
