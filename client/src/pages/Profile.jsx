import React, { useState } from 'react'
<<<<<<< HEAD
import { useDispatch, useSelector } from 'react-redux'
import { FaUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import fetchUserDetails from '../utils/fetchUserDetails';
import { setUserDetails } from '../store/userSlice';
=======
import { useSelector } from 'react-redux'
import { FaUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit';
>>>>>>> 444449e2c771079ff9ebde15df7ca178b4916155



const Profile = () => {
    const user = useSelector(state => state.user)
    const [openProfileAvatarEdit, setProfileAvatarEdit] = useState(false)
<<<<<<< HEAD
    const [userData, setUserData] = useState({
        name:  user.name,
        email: user.email,
        mobile: user.mobile
    })
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(()=>{
        setUserData({
        name:  user.name,
        email: user.email,
        mobile: user.mobile
        })
    },[])

    const handleOnChange= (e)=>{
        const {name, value} = e.target

        setUserData((preve)=>{
            return {
                ...preve,
                [name] : value
            }
        })
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.updateUsersDetails,
                data : userData
            })

            const {data: responseData} = response
            if(responseData.success){
                toast.success(responseData.message)
                const userData = await fetchUserDetails()
                dispatch(setUserDetails(userData.data))
            }
        } catch (error) {
            AxiosToastError(error)
        } finally{
            setLoading(false)
        }
    }
  return (
    <div>
        {/* profile upload and display image */}
=======

  return (
    <div>
>>>>>>> 444449e2c771079ff9ebde15df7ca178b4916155
        <div className='w-18 h-18 bg-red-500 flex items-center justify-items-center rounded-full overflow-hidden drop-shadow-sm'>
            {
                user.avatar ? (
                    <img src={user.avatar} alt={user.name} className='w-full h-full' />
                ) : (
                    <FaUserCircle size={55}/>
                )
            }
        </div>
        <button className='text-sm min-w-20 border border-primary-100 hover:border-x-primary-200 hover:bg-primary-100 
        px-3 py-1 rounded-full mt-3'>Edit</button>

        {
            openProfileAvatarEdit && (
                <UserProfileAvatarEdit close={()=> setProfileAvatarEdit(false)}/>
            )
        }
<<<<<<< HEAD

        {/* name, mobile, email, change password */}
        <form className='my-4 grid gap-4' onSubmit={handleSubmit}>
            <div className='grid'>
                <label htmlFor="name">Name</label>
                <input type="text" placeholder='Enter your name' className='p-2 bg-blue-50 outline-primary border
                 focus-within:border-x-primary-200 rounded' 
                 value={userData.name} name='name' onChange={handleOnChange} required/>
            </div>
            <div className='grid'>
                <label htmlFor="email">Email</label>
                <input id='email' type="email" placeholder='Enter your email' className='p-2 bg-blue-50 outline-primary border
                 focus-within:border-x-primary-200 rounded' 
                 value={userData.name} name='email' onChange={handleOnChange} required/>
            </div>
            <div className='grid'>
                <label htmlFor="mobile">Name</label>
                <input type="number" placeholder='Enter your mobile' className='p-2 bg-blue-50 outline-primary border
                 focus-within:border-x-primary-200 rounded' 
                 value={userData.name} name='mobile' onChange={handleOnChange} required/>
            </div>

            <button className='border px-4 py-2 font-semibold 
            hover:bg-primary-100 border-primary-100 text-purple-900 hover:text-neutral-800 rounded'>
                {
                    loading ? "Loading..." : "Submit"
                }
            </button>
        </form>
=======
>>>>>>> 444449e2c771079ff9ebde15df7ca178b4916155
    </div>
  )
}

export default Profile