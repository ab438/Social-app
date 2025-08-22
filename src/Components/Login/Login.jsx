import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import z from 'zod'
import { User } from './../../Context/UserContext';
export default function Login() {
  const [logerror, setlog] = useState("")
  const [isLoading, setloading] = useState(false)
  let {userlogin, setuserlogin} = useContext(User)
  const nav = useNavigate()
  const zz = z.object({
    email : z.email("invalid mail"),
    password : z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"wrong syntax password")
  })
  const log = useForm({
    defaultValues : {
      email : "",
      password : ""
    },
    resolver : zodResolver(zz)
  })
  let {register,handleSubmit, formState} = log
  function handlelogin(values){
    setloading(true)
    axios.post("https://linked-posts.routemisr.com/users/signin", values)
    .then((res) => {
      setloading(false)
      console.log(res);
      if(res.data.message === "success"){
        nav('/')
        localStorage.setItem("userToken", res.data.token)
        setuserlogin(res.data.token)
      }
    })
    .catch((err) => {
      setlog(err.response.data.error)
      setloading(false)
    })
  }
  
  return (
      <form className="max-w-md py-12 mx-auto" onSubmit={handleSubmit(handlelogin)}>
        {logerror && <h1 className='text-white bg-red-700 text-center'>{logerror}</h1>}
        <div className="relative z-0 w-full mb-5 group">
            <input type="email" {...register("email")} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
            {formState.errors.email && formState.touchedFields.email ? <p className='text-red-700 text-center'>{formState.errors.email.message}</p> : ""}
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input type="password" {...register("password")} id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            {formState.errors.password && formState.touchedFields.password ? <p className='text-red-700 text-center'>{formState.errors.password.message}</p> : ""}
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isLoading ? <i class="fa-solid fa-spinner"></i> : "submit"}</button>
      </form>
  )
}
