import React, { useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
<<<<<<< HEAD
import { useDispatch, useSelector } from 'react-redux';
import Axios from '../utils/Axios';
import { updatedAvatar } from '../store/userSlice';
import { MdClose } from "react-icons/md";

const UserProfileAvatarEdit = ({close}) => {
    const user = useSelector(state=> user.state)
    const dispatch = useDispatch()
=======
import { useSelector } from 'react-redux';


const UserProfileAvatarEdit = () => {
    const user = useSelector(state=> user.state)

>>>>>>> 444449e2c771079ff9ebde15df7ca178b4916155
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e)=>{
        e.preventDefault()
    }
<<<<<<< HEAD

    const handleUploadAvatarImage = async(e)=>{
        const file = e.target.files[0]

        if(!file){
            return 
        }

        const formData = new FormData()
        formData.append('avatar', file)

        setLoading(true)
        try {
            const response = await Axios({
                ...SummaryApi.uploadAvatar,
                data : formData
            })
            const {data: responseData} = response
            dispatch(updatedAvatar(responseData.data, avatar))

        } catch (error) {
            AxiosToastError(error)
        } finally{
            setLoading(false)
        }

    }
  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-60 p-4 flex items-center justify-center'>
        <div className='bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center'>
            <button onClick={close} className='text-neutral-800 w-fit block ml-auto'>
                <MdClose size={20}/>
            </button>
=======
  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-60 p-4 flex items-center justify-center'>
        <div className='bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center'>
>>>>>>> 444449e2c771079ff9ebde15df7ca178b4916155
            <div className='w-20 h-20 bg-red-500 flex items-center justify-center rounded-full overflow-hidden drop-shadow-lghadow'>
                {
                    user.Avatar ? (
                        <img src={user.avatar} alt={user.name} />
                    ) : (
                        <FaUserCircle/>
                    )
                }
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="uploadProfile"></label>
<<<<<<< HEAD
                <div className='border border-primary-200 cursor-pointer hover:bg-primary-200 px-4 py-1 rounded text-sm my-3'>Upload
                    {
                        loading ? "Loading..." : "Upload"
                    }
                </div>
                <input onChange={handleUploadAvatarImage} type="file" id='uploadProfile' className='hidden'/>
=======
                <div className='border border-primary-200 hover:bg-primary-200 px-4 py-1 rounded text-sm my-3'>Upload
                    {
                        loading ? "Loading..." : "Uploaded"
                    }
                </div>
                <input type="file" id='uploadProfile' className='hidden'/>
>>>>>>> 444449e2c771079ff9ebde15df7ca178b4916155
            </form>
            
        </div>
    </section>
  )
}

export default UserProfileAvatarEdit