import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import React, { useState } from 'react'
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from '../common/SummaryApi.js'
import AxiosToastError from "../utils/AxiosToastError";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    name : "",
    email : "",
    password : "",
    confirmPassword : ""
  })
  
  const [showpassword, setShowPassword] = useState(false)
  const [confirmShowPassword ,setConfirmShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e)=>{
    const {name, value} = e.target

    setData((prev)=>{
      return{
        ...prev,
        [name] : value,
        [email] : value,
        [password] : value,
        [confirmPassword] : value
      }
    })
  }

  const validateValue = Object.values(data).every(e1 => e1)

  const handleSubmit = async(e) => {
    e.preventDefault()

    if(data.password !== data.confirmPassword){
      toast.error(
        "Password and confirm password must be same"
      )
      return
    }
    try {
      const response = await Axios({
        ...SummaryApi.register,
        data : data
      })
      if(response.data.error){
        toast.error(response.data.message)
      }

      if(response.data.success){
        toast.success(response.data.message)
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: ""
        })
        navigate("/login")
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section className='w-full container mx-auto px-2'>
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p>Welcome to Buzzer</p>

        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          <div className='grid gap-1'>
            <label htmlFor="name">Name</label>
            <input type="text" autoFocus className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200' 
            id="name" name="name" value={data.name} onChange={handleChange} placeholder="Enter your name"/>
          </div>
          <div className="grid gap-1">
            <label htmlFor="email">Email</label>
            <input type="text" className="bg-blue-50 p-2 border rounded outline-none focus:border-primary-200" 
            id='email' name="email" value={data.email} onChange={handleChange} placeholder="Enter your email"/>
          </div>
          <div className="grid gap-1">
            <label htmlFor="password">Password</label>
            <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
              <input type={showpassword ? "text" : "password"}  className="w-full outline-none" 
              id="password" name="password" value={data.password} onChange={handleChange} placeholder="Enter your password"/>
            </div>
            <div onClick={setShowPassword(prev => !prev)} className="cursor-pointer">
              {
                showpassword ? (
                  <IoMdEye/>
                ) : (
                  <IoMdEyeOff/>
                )
              }
            </div>
          </div>
          <div className="grid gap-1">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="bg-blue-50 p-2 border rounded outline-none focus-within:border-primary-200" >
              <input type={confirmShowPassword ? "text" : "password"} className="w-full outline-none"
              id="confirmPassword" name="confirmPassword" value={data.confirmPassword} onChange={handleChange} placeholder="Confirm your password"/>
            </div>
            <div onClick={setConfirmShowPassword(prev=> !prev)} className="cursor-pointer">
              {
                confirmShowPassword ? (
                  <IoMdEye/>
                ) : (
                  <IoMdEyeOff/>
                )
              }
            </div>
          </div>

          <button disabled={!validateValue} className={` ${validateValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white py-2 rounded font-semibold my-3 tracking-wide`}>Register</button>
        </form>

        <p>
          Already have an account? <Link to={'/login'} className="font-semibold text-green-700 hover:text-green-800">Login</Link>
        </p>
      </div>
    </section>
  )
}

export default Register