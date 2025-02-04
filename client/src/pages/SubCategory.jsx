import React, { useState } from 'react'
import UploadSubCategoryModel from '../components/UploadSubCategoryModel'

const SubCategory = () => {
  const [openAddSubCategory, setAddOpenSubCategory] = useState(false)

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