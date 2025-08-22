import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import z from 'zod'
export default function Register() {
  const navigate = useNavigate()
  const [apiError, setapi] = useState("")
  const [isLoading, setLoading] = useState(false)
  const x = z.object({
    name : z.string().min(1, "Name is required").max(10, "characters must be under 10"),
    email : z.string().email("invalid mail"),
    password : z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"wrong syntax password"),
    rePassword : z.string(),
    dateOfBirth : z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date is wrong").refine((date)=> {
      const y = new Date(date)
      const z = new Date
      z.setHours(0,0,0,0)
      return y < z
    }, "cant be future date"),
    gender : z.enum(["male", "female"])
  }).refine((object)=>object.password === object.rePassword,{ 
    error : "invalid repassword not match password",
    path : ["rePassword"]
  })
  const form = useForm({
    defaultValues : {
      name : "",
      email : "",
      password : "",
      rePassword : "",
      dateOfBirth : "",
      gender : ""
    },
    resolver : zodResolver(x)
  })

  let {register, handleSubmit, formState} = form
  function handleform(values){
    setLoading(true)
    axios.post("https://linked-posts.routemisr.com/users/signup", values)
    .then((res) => {
      if(res.data.message === "success"){
        navigate("/login")
        setLoading(false)
      }
    })
    .catch((err) => {
      setapi(err.response.data.error)
      setLoading(false)
    })
  }
  return (
    <div className='py-12'>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit(handleform)}>
        {apiError &&  <h1 className='text-white mb-6 p-2 text-center font-semibold bg-red-600'>{apiError}</h1>}
        <div className="relative z-0 w-full mb-5 group">
            <input type="text" {...register("name")} id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name</label>
            {formState.errors.name && formState.touchedFields.name? <p className='text-red-600 text-center font-semibold my-2'>{formState.errors.name.message}</p> : ""}
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input type="email" {...register("email")} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
            {formState.errors.email && formState.touchedFields.email ? <p className='text-red-600 text-center'>{formState.errors.email.message}</p> : ""}
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input type="password" {...register("password")} id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password</label>
            {formState.errors.password && formState.touchedFields.password ? <p className='text-red-600 text-center'>{formState.errors.password.message}</p> : ""}
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input type="password" {...register("rePassword")} id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
            <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Re Password</label>
            {formState.errors.rePassword && formState.touchedFields.rePassword ? <p className='text-red-600 text-center'>{formState.errors.rePassword.message}</p> : ""}
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input type="date" {...register("dateOfBirth")} id="dateOfBirth" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label htmlFor="dateOfBirth" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Date</label>
            {formState.errors.dateOfBirth && formState.touchedFields.dateOfBirth ? <p className='text-red-600 text-center'>{formState.errors.dateOfBirth.message}</p> : ""}
        </div>
        <div className="flex items-center ps-4  dark:border-gray-700">
            <input id="male" type="radio" value="male" {...register("gender")} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            <label htmlFor="male" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Male</label>
            {formState.errors.gender && formState.touchedFields.gender ? <p className='text-red-600 text-center'>{formState.errors.gender.message}</p> : ""}
        </div>
        <div className="flex items-center ps-4  dark:border-gray-700">
            <input id="female" type="radio" value="female" {...register("gender")} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            <label htmlFor="female" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Female</label>
            {formState.errors.gender && formState.touchedFields.gender ? <p className='text-red-600 text-center'>{formState.errors.gender.message}</p> : ""}
        </div>

        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isLoading ? <i class="fa-solid fa-spinner"></i> : "submit"}</button>
      </form>
    </div>
  )
}
