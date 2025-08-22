import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function Changepassword() {
  const [isshow, setshow] = useState(false)

  const form = useForm({
    defaultValues : {
      password : "",
      newPassword : ""
    }
  })
  let {register , handleSubmit} = form

  function handleForm(values){
    console.log(values);
    return axios.patch("https://linked-posts.routemisr.com/users/change-password",values, {
      headers : {
        token : localStorage.getItem("userToken")
      }
    })
    .then((res) => {
      console.log(res);
      if(res.data.message === "success"){
        localStorage.setItem("userToken" , res.data.token)  // ✅ تعديل getItem → setItem
        toast.success("changed successfully")
        setshow(false) // يقفل المودال بعد التغيير
      }
    })
    .catch((err) => {
      console.log(err);
      toast.error("changed failed")
    })
  }

  return (
    <>
     <div>
      <button 
        onClick={() => setshow(true)} 
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 w-[50%] mx-auto font-medium rounded-lg text-sm px-5 py-2.5 text-center">
        Change Password
      </button>

      {isshow && (
        <div id="authentication-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative bg-white rounded-lg shadow-sm w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-semibold text-gray-900">
                Change Password
              </h3>
              <button 
                type="button" 
                onClick={() => setshow(false)} 
                className="text-gray-400 hover:text-gray-900">
                <i className='fas fa-close cursor-pointer'></i>
              </button>
            </div>
            <div className="p-4">
              <form className="space-y-4" onSubmit={handleSubmit(handleForm)}>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium">Current Password</label>
                  <input type="password" {...register("password")} id="password" className="w-full border rounded-lg p-2.5" />
                </div>
                <div>
                  <label htmlFor="newPassword" className="block mb-2 text-sm font-medium">New Password</label>
                  <input type="password" {...register("newPassword")} id="newPassword" className="w-full border rounded-lg p-2.5" />
                </div>
                <button type="submit" className="w-full text-white bg-blue-700 rounded-lg px-5 py-2.5">Change</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  )
}
