import React from 'react'
import { toast } from 'react-hot-toast';
import  axios  from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
export default function Updatepost({id}) {
  const que = useQueryClient()
  const [isshow, setshow] = useState(false)
  const modal = useForm({
    defaultValues : {
      body : "",
      image : ""
    }
  })
  async function handlemodal(values){
    console.log(values.body);
    console.log(values.image[0]);
    let Data = new FormData()
    Data.append("body", values.body)
    Data.append("image", values.image[0])
    return axios.put(`https://linked-posts.routemisr.com/posts/${id}`, Data, {
      headers : {
        token : localStorage.getItem("userToken")
      }
    })
    .then((res) => {
      if(res.data.message == "success"){
        console.log(res);
        toast.success("Upload post is changed")
        que.invalidateQueries({querykey : ["getuserpost"]})
      }
    })
    .catch((err) => {
      console.log(err);
      toast.error("Upload post is failed")
    })
  }
  let {register , handleSubmit} = modal
  function changemodal(){
    setshow(true)
    console.log("hello");
    
  }
  return (
    <>
      <button data-modal-target="authentication-modal" onClick={changemodal} data-modal-toggle="authentication-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-[30%] my-3 mx-auto" type="button">
        Update Post
      </button>
      {isshow && <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-auto fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="relative p-4 w-full m-auto my-10 max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          Update Post
                      </h3>
                      <button onClick={() => setshow(false)} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                        <i className='fas fa-close cursor-pointer'></i>
                          <span className="sr-only">Close modal</span>
                      </button>
                  </div>
                  <div className="p-4 md:p-5">
                      <form className="space-y-4" action="#">
                          <div>
                              <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center">Add Text</label>
                              <input type="text" {...register("body")} id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder=""/>
                          </div>
                          <div>
                              <label htmlFor="image" className="block mb-2 text-sm font-medium mx-auto w-full bg-red-600 justify-center flex p-4 text-gray-900 dark:text-white">
                                <i class="fa-solid fa-image fa-2xl" ></i>
                              </label>
                              <input type="file" hidden  {...register("image")} id="image" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"/>
                          </div>
                          <button type="submit" onClick={handleSubmit(handlemodal)} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Post</button>
                      </form>
                  </div>
              </div>
          </div>
      </div>} 

    </>
  )
}
