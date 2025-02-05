import React, { useEffect, useState } from 'react'
import UploadSubCategoryModel from '../components/UploadSubCategoryModel'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import DisplayTable from '../components/DisplayTable'
import { createColumnHelper } from '@tanstack/react-table'

const SubCategory = () => {
  const [openAddSubCategory, setAddOpenSubCategory] = useState(false)
  const [data ,setData] = useState([])
  const [loading ,setLoading] = useState(false)

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
          return <img src={row.original.image} alt={row.original.image} className='w-8 h-8' />
        </div>
      }
    }),
    columnHelper.accessor("category",{
      header: "Category"
    })
  ]

  return (
    <section>
      <div className='p-2 bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibod'>Sub Category</h2>
        <button onClick={()=>setAddOpenSubCategory(true)} className='text-sm border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'>Add Sub Category</button>
      </div>

      <div>
        <DisplayTable data={data} columns = {column}/>
      </div>

      {
        openAddSubCategory && (
          <UploadSubCategoryModel close={()=>setAddOpenSubCategory(false)}/>
        )
      }
    </section>
  )
}

export default SubCategory