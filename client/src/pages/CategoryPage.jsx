import React, { useState } from 'react'
import { useEffect } from 'react'
import Loading from '../components/Loading'
import Nodata from '../components/Nodata'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'

const CategoryPage = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false)
  const [loading, setLoading] = useState(false)
  const [categoryData,setCategoryData] = useState([])

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

  useEffect(()=>{
    fetchCategory()
  },[])
  return (
    <section>
      <div className='p-2 bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Category</h2>
        <button onClick={()=>setOpenUploadCategory(true)} className='text-sm border-x-primary-200 hover:bg-primary-200 px-3 py-1 rounded'>Add Cateogry</button>
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
            <div className='w-36 h-48 rounded shadow-md'>
              <img src={category.image} alt={category.name} className='w-48 object-scale-down'/>
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
    </section>
  )
}

export default CategoryPage