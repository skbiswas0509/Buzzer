import React, { useEffect, useState } from 'react'
import UploadSubCategoryModel from '../components/UploadSubCategoryModel'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'

const SubCategory = () => {
  const [openAddSubCategory, setAddOpenSubCategory] = useState(false)
  const [data ,setData] = useState([])
  const [loading ,setLoading] = useState(false)

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


  return (
    <section>
      <div className='p-2 bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibod'>Sub Category</h2>
        <button onClick={()=>setAddOpenSubCategory(true)} className='text-sm border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'>Add Sub Category</button>
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