import React, { useState } from 'react'

const CategoryPage = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false)
  return (
    <section>
      <div className='p-2 bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Category</h2>
        <button onClick={()=>setOpenUploadCategory(true)} className='text-sm border-x-primary-200 hover:bg-primary-200 px-3 py-1 rounded'>Add Cateogry</button>
      </div>

      {
        openUploadCategory && (
          <UploadCategoryModel close={()=>setOpenUploadCategory(false)}/> 
        )
      }
    </section>
  )
}

export default CategoryPage