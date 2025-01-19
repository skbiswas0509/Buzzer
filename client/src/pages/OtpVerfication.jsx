import React, { useEffect, useRef, useState } from 'react'
import { IoMdEyeOff } from 'react-icons/io'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'

const OtpVerfication = () => {
  const [data, setData] = useState(["","","","","",""])
  const navigate = useNavigate()
  const inputRef = useRef([])
  const location = useLocation()
  
  useEffect(()=>{
    if(!location?.state?.email){
        navigate("/forgot-password")
    }
  },[])

  const validateValue = data.every(e1 => e1)

  const handleSubmit = async(e) =>{
    e.preventDefault()

    try {
      const response = await Axios({
        ...SummaryApi.verify_password_otp,
        data : {
            otp : data.join(""),
            email : location?.state?.email
        }
      })
      if(Response.data.error){
        toast.error(response.data.message)
      }
      if(Response.data.success){
        toast.success(response.data.message)
        setData(["","","","","","",""])
        navigate("/reset-password",{
            state : {
                data : response.data,
                email : location?.state?.email
            }
        })
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
  return (
    <section className='w-full container mx-auto px-2'>
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className='font-semibold text-lg'>Enter OTP</p>

        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="otp">Enter your OTP</label>
            <div className='flex items-center gap-2 justify-between mt-3'>
                {
                    data.map((element,index)=>{
                        return(
                            <input key={"otp"+index} type="text" ref={(ref)=>{
                                inputRef.current[index] = ref
                                return ref
                            }}
                            value={data[index]} onChange={(e)=>{
                                const value = e.target.value()
                                
                                const newData = [...data]
                                newData[index] = value
                                setData(newData)

                                if(value && index < 5){
                                    inputRef.current[index+1].focus()
                                }
                            }} 
                            className='bg-blue-50 w-full max-w-16 p-2 border rounded outline-none focus:border-primary-200 text-center font-semibold' id='otp' maxLength={1}/>
                        )
                    })
                }
            </div>
            
          </div>

        <button disabled={!validateValue} className={`${validateValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white py-2 rounded font-semibold my-3 tracking-wide`}>Verify OTP</button>
      </form>

        <p>
          Already have an account? <Link to={'/login'} className='font-semibold text-green-700 hover:text-green-800'>Login</Link>
        </p>
      </div>
    </section>
  )
}

export default OtpVerfication