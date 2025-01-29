import React, { useState } from 'react'
import { IoMdEyeOff } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import fetchUserDetails from '../utils/fetchUserDetails'
import { useDispatch } from 'react-redux'
import { setUserDetails } from '../store/userSlice'

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: ""
  })

  const [showpassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e)=>{
    const {name, value} = e.target

    setData((prev)=>{
      return{
        ...prev,
        [email] : value,
        [password] : value
      }
    })
  }

  const validateValue = Object.values(data).every(e1 => e1)

  const handleSubmit = async(e) =>{
    e.preventDefault()

    try {
      const reponse = await Axios({
        ...SummaryApi.login,
        data : data
      })
      if(Response.data.error){
        toast.error(reponse.data.message)
      }
      if(Response.data.success){
        toast.success(reponse.data.message)
        localStorage.setItem('accesstoken',response.data.data.accesstoken)
        localStorage.setItem('refreshtoken', response.data.data.refreshtoken)

        const userDetails = await fetchUserDetails()
        dispatch(setUserDetails(userDetails.data))

        setData({
          email: "",
          password : ""
        })
        navigate("/")
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
  return (
    <section className='w-full container mx-auto px-2'>
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p>Login to Buzzer</p>

        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="email">Email</label>
            <input type="text" className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200' 
            id='email' name='email' value={data.email} onChange={handleChange} placeholder='Enter your password'/>
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
          <div onClick={setShowPassword(prev=> !prev)} className='cursor-pointer'>
            {
              showpassword ? (
                <IoMdEye/>
              ) : (
                <IoMdEyeOff/>
              )
            }
            <Link to={"/forgot-password"} className='block ml-auto hover:text-primary-200'>Forgot Password ? </Link>
          </div>

        <button disabled={!validateValue} className={`${validateValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white py-2 rounded font-semibold my-3 tracking-wide`}></button>
      </form>

        <p>
          Don't have an account? <Link to={'/register'} className='font-semibold text-green-700 hover:text-green-800'>Register</Link>
        </p>
      </div>
    </section>
  )
}

export default Login