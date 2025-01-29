import React, { useState } from 'react'
import { IoMdEyeOff } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: ""
  })

  const navigate = useNavigate()

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
        ...SummaryApi.forgot_password,
        data : data
      })
      if(Response.data.error){
        toast.error(reponse.data.message)
      }
      if(Response.data.success){
        toast.success(reponse.data.message)
        navigate("/otp-verification",{
            state : data
        })
      }
        setData({
          email: ""
        })
    } catch (error) {
      AxiosToastError(error)
    }
  }
  return (
    <section className='w-full container mx-auto px-2'>
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className='font-semibold text-lg'>Forgot Password?</p>

        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="email">Email</label>
            <input type="text" className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200' 
            id='email' name='email' value={data.email} onChange={handleChange} placeholder='Enter your password'/>
          </div>

        <button disabled={!validateValue} className={`${validateValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white py-2 rounded font-semibold my-3 tracking-wide`}>Send OTP</button>
      </form>

        <p>
          Already have an account? <Link to={'/login'} className='font-semibold text-green-700 hover:text-green-800'>Login</Link>
        </p>
      </div>
    </section>
  )
}

export default ForgotPassword