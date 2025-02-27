import React, { useState } from 'react'
import EditProductAdmin from './EditProductAdmin'

const ProductCardAdmin = ({data, fetchProductData }) => {
  const [editOpen, setEditOpen] = useState(false)

  return (
    <div className='w-36 p-4 bg-white rounded'>
        <div>
            <img src={data?.image[0]} alt={data?.name} className='w-full h-full object-scale-down' />
        </div>
        <p className='text-ellipsis line-clamp-2 font-medi'>{data?.name}</p>
        <p className='text-slate-400'>{data?.unit}</p>
        <div className='grid grid-cols-2 gap-3 py-2'>
          <button onClick={()=>setEditOpen(true)} className='border px-1 py-1 text-sm border-green-600 bg-green-100 text-green-800 hover:bg-green-200 rounded'>Edit</button>
          <button className='border px-1 py-1 text-sm border-red-600 bg-red-100 text-red-600 hover:bg-red-200'>Delete</button>
        </div>

        {
          editOpen && (
            <EditProductAdmin fetchProductData={fetchProductData} data={ data } close={()=>setEditOpen(false)}/>
          )
        }
    </div>
  )
}

export default ProductCardAdmin