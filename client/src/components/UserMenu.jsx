import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Divider from './Divider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'
import { FiExternalLink } from "react-icons/fi";


const UserMenu = ({close}) => {
    const user = useSelector((state)=> state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogOut = async()=>{
      try {
        const response = await Axios({
          ...SummaryApi.logout
        })

        if(response.data.success){
          if(close){
            close()
          }
          dispatch(logout())
          localStorage.clear()
          toast.success(response.data.message)
          navigate("/")
        }
      } catch (error) {
        AxiosToastError(error)
      }
    }
  return (
    <div>
        <div className='font-semibold'>My Account</div>
        <div className='text-sm flex items-center gap-2'>
          <span className='max-w-52 text-ellipsis line-clamp-1'>{user.name || user.mobile}</span> 
          <Link onClick={handleClose} to={"/dashboard/profile"}><FiExternalLink size={15} className='hover: text-primary-200'/></Link>
            <Link to={"/dashboard/profile"}><FiExternalLink size={15} className='hover: text-primary-200'/></Link>
        </div>
        <Divider/>
        <div className='text-sm grid gap-1'>
            <Link onClick={handleClose} to={"/dashboard/category"} className='px-2 hover:bg-orange-200 py-1'>Category</Link>
            <Link onClick={handleClose} to={"/dashboard/subcategory"} className='px-2 hover:bg-orange-200 py-1'>Sub Category</Link>
            <Link onClick={handleClose} to={"/dashboard/upload-category"} className='px-2 hover:bg-orange-200 py-1'>Upload Product</Link>
            <Link onClick={handleClose} to={"/dashboard/products"} className='px-2 hover:bg-orange-200 py-1'>Product</Link>
            <Link onClick={handleClose} to={"/dashboard/myorders"} className='px-2 hover:bg-orange-200 py-1'>My Orders</Link>
            <Link onClick={handleClose} to={"/dashboard/address"} className='px-2 hover:bg-orange-200 py-1'>Address</Link>
            <button onClick={handleLogOut} className='text-left px-2'>Log Out</button>
        </div>
    </div>
  )
}

export default UserMenu