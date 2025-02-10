import React from 'react'

const ProductCardAdmin = ({data}) => {
  return (
    <div className='w-36 p-4 bg-white rounded'>
        <div>
            <img src={data?.image[0]} alt={data?.name} className='w-full h-full object-scale-down' />
        </div>
        <p className='text-eclipssis line-clamp-2 font-medi'>{data?.name}</p>
        <p className='text-slate-400'>{data?.unit}</p>
    </div>
  )
}

export default ProductCardAdmin