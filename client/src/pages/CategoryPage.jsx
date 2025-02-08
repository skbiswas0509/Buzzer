import React, { useState } from 'react'
import { useEffect } from 'react'
import Loading from '../components/Loading'
import Nodata from '../components/Nodata'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import EditCategory from '../components/EditCategory'
import ConfirmBox from '../components/ConfirmBox'
import AxiosToastError from '../utils/AxiosToastError'
import { useSelector } from 'react-redux'

const CategoryPage = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false)
  const [loading, setLoading] = useState(false)
  const [categoryData,setCategoryData] = useState([])
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({
    name: "",
    image: ""
  })
  const [openDeleteBox, setOpenDeleteBox] = useState(false)
  const [deleteCategory, setDeleteCategory] = useState({
    _id : ""
  })

  

  useEffect(()=>{
    setCategoryData(allCategory)
  },[allCategory])
  const fetchCategory = async()=>{
    try {
      setLoading(true) 
      const response = await Axios({
        ...SummaryApi.getCatgory
      })   
      const {data : responseData} = response

      if(responseData.success){
        setCategoryData(responseData.data)
      }
    } catch (error) {
      
    }finally{
      setLoading(false)
    }
  }
  
  // const allCategory = useSelector(state=>state.product.allCategory)
  // useEffect(()=>{
  //   fetchCategory()
  // },[])

  const handleDelete = async()=>{
    try {
      const response = await Axios({
        ...SummaryApi.deleteCategory,
        data : deleteCategory
      })

      const {data : responseData } = response
      if(responseData.success){
        toast.success(responseData.message)
        fetchCategory()
        setOpenDeleteBox(false)
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section>
      <div className='p-2 bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Category</h2>
        <button onClick={()=>setOpenUploadCategory(true)} className='text-sm border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'>Add Cateogry</button>
      </div>
      {
        !categoryData[0] && !loading && (
          <Nodata/>
        )
      }
      <div className='p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2'>
      {
        categoryData.map((category, index)=>{
          return(
            <div className='w-36 h-56 rounded shadow-md' key={category._id}>
              <img src={category.image} alt={category.name} className='w-48 object-scale-down'/>
              <div className='items-center h-9 flex gap-2'>
                <button onClick={()=>{
                  setOpenEdit(true)
                  setEditData(category)
                }} className='flex-1 bg-green-100 hover:bg-green-200  text-green-600 font-medium py-1 rounded'>
                  Edit
                </button>
                <button onClick={()=>{
                  setOpenDeleteBox(true)
                  setDeleteCategory(category)
                }} 
                className='flex-1 bg-green-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded'>
                  Delete
                </button>
              </div>
            </div>
          )
        })
      }
      </div>
      {
        loading && (
          <Loading/>
        )
      }
      {
        openUploadCategory && (
          <UploadCategoryModel fetchData={fetchCategory} close={()=>setOpenUploadCategory(false)}/> 
        )
      }
      {
        openEdit && (
          <EditCategory data={editData} close={()=>setOpenEdit(false)} fetchData={fetchCategory}/>
        )
      }
      {
        openDeleteBox && (
          <ConfirmBox close={()=>setOpenDeleteBox(false)} cancel={()=>setOpenDeleteBox(false)} confirm={handleDelete}/>
        )
      }
    </section>
  )
}

export default CategoryPage