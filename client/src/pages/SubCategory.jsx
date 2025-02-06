import React, { useEffect, useState } from 'react'
import UploadSubCategoryModel from '../components/UploadSubCategoryModel'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import DisplayTable from '../components/DisplayTable'
import { createColumnHelper } from '@tanstack/react-table'
import ViewImage from '../components/ViewImage'
import { HiPencil } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import EditSubCategory from '../components/EditSubCategory'
import ConfirmBox from '../components/ConfirmBox'
import toast from 'react-hot-toast'

const SubCategory = () => {
  const [openAddSubCategory, setAddOpenSubCategory] = useState(false)
  const [data ,setData] = useState([])
  const [loading ,setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({
    _id: ""
  })
  const [deleteSubCategory, setDeleteSubCategory] = useState({
    _id: ""
  })
  cosnt [openDeleteConfirmBox, setOpenDeleteConfirmBox] = useState(false)

  const columnHelper = createColumnHelper()

  const fetchSubCategory = async()=>{
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getSubCategory
      })
      const {data: responseData} = response

      if(responseData.success)[
        setData(responseData.data)
      ]
    } catch (error) {
      AxiosToastError(error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchSubCategory()
  },[])

  const column = [
    columnHelper.accessor('name', {
      header: "Name"
    }),
    columnHelper.accessor('image', {
      header: "Image",
      cell: ({row})=>{
        return <div className='flex justify-center items-center'>
          return <img src={row.original.image} alt={row.original.image} className='w-8 h-8 cursor-pointer' onClick={()=>{setImageUrl(row.original.image)}} />
        </div>
      }
    }),
    columnHelper.accessor("category",{
      header: "Category",
      cell: ({row})=>{
        return(
          <>
            {
              row.original.category.map((c,index)=>{
                return(
                  <p key={c._id+"table"} className='shadow-md px-1 inline-block'>{c.name}</p>
                )
              })
            }
          </>
        )
      }
    }),
    columnHelper.accessor("_id",{
      header : "Action",
      cell : ({row})=>{
        return(
          <div className='flex items-center justify-center gap-3'>
            <button onClick={()=>{
              setOpenEdit(true) 
              setEditData(row.original)}} 
              className='p-2 bg-green-100 rounded-full hover:text-green-600'>
              <HiPencil size={20}/>
            </button>
            <button onClick={()=>{
              setOpenDeleteConfirmBox(true)
              setDeleteSubCategory(row.original)
            }} 
            className='p-2 bg-red-100 rounded-full text-red-500 hover:text-red-600'>
              <MdDelete size={20}/>
            </button>
          </div>
        )
      }
    })
  ]
  
  const handleDeleteSubCategory = async()=>{
    try {
      const response = await Axios({
        ...SummaryApi.deleteSubCategory,
        data : deleteSubCategory
      })
      const {data : responseData } = response

      if(responseData.success){
        toast.success(responseData.message)
        fetchSubCategory()
        setOpenDeleteConfirmBox(false)
        setDeleteSubCategory({_id : ""})
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section>
      <div className='p-2 bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibod'>Sub Category</h2>
        <button onClick={()=>setAddOpenSubCategory(true)} className='text-sm border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'>Add Sub Category</button>
      </div>

      <div className='overflow-auto w-full max-w-[95vw]'>
        <DisplayTable data={data} columns = {column}/>
      </div>

      {
        openAddSubCategory && (
          <UploadSubCategoryModel close={()=>setAddOpenSubCategory(false)}/>
        )
      }

      {
        imageUrl && 
        <ViewImage url={imageUrl} close={()=>setImageUrl("")}/>
      }

      { openEdit &&
        <EditSubCategory data={editData} close={()=>setOpenEdit(false)} fetchData={fetchSubCategory}/>
      }
      {
        openDeleteConfirmBox &&
        <ConfirmBox 
          cancel={()=>setOpenDeleteConfirmBox(false)}
          close={()=>setOpenDeleteConfirmBox(false)}
          confirm={handleDeleteSubCategory}
        />
      }
    </section>
  )
}

export default SubCategory