import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
export default function Uploadphoto() {
  const [show , setshow] = useState(false)
  const form = useForm({
    defaultValues : {
      photo : ""
    }
  })
  function handlephoto(values){
    console.log(values);
    let Data = new FormData()
    Data.append("photo", values.photo[0])
    return axios.put("https://linked-posts.routemisr.com/users/upload-photo", Data, {
      headers : {
        token : localStorage.getItem("userToken")
      }
    })
    .then((res) => {
      if(res.data.message == "success"){
        console.log(res);
        toast.success("Upload is success")
      }
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.response.data.error)
    })
  }
  let {register , handleSubmit} = form
  return (
    <>
      <button data-modal-target="authentication-modal" onClick={() => setshow(true)} data-modal-toggle="authentication-modal" class="block w-[50%] mx-auto my-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
        Upload Photo
      </button>
      {show && (<div id="authentication-modal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div class="relative p-4 w-full mx-auto my-28 max-w-md max-h-full">
              <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                  <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                      <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                          Upload Photo
                      </h3>
                      <button type="button" onClick={() => setshow(false)} class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                          <i class="fa-solid fa-xmark"></i>
                          <span class="sr-only">Close modal</span>
                      </button>
                  </div>
                  <div class="p-4 md:p-5">
                      <form class="space-y-4" onSubmit={handleSubmit(handlephoto)} action="#">
                          <div>
                            <label htmlFor="photo">
                              <i class="fa-solid fa-image text-white"></i>
                            </label>
                              <input type="file" hidden {...register("photo")} id="photo" placeholder="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                          </div>
                          <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ok</button>
                      </form>
                  </div>
              </div>
          </div>
      </div>)}
    </>
  )
}
