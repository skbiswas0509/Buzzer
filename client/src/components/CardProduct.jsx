import React from 'react'
import { DisplayPriceInTaka } from '../utils/DisplayPriceInTaka'
import { Link } from 'react-router-dom'
import { validURLConvert } from '../utils/validURLConvert'

const CardProduct = ({ data }) => {
    const url = `/product/${validURLConvert(data.name)}-${data._id}`
    return (
        <Link to={url} className='border py-2 lg:p-4 grid gap-1 lg:gap-2 min-w-3 lg:min-w-52 rounded'>
            <div className='min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden'>
                <img src={data.image[0]} alt={data.image} className='w-full h-full object-scale-down lg:scale-125' />
            </div>
            <div className='rounded text-xs w-fit p-[1x] px-2 text-green-600 bg-green-50'>
                10 min
            </div>
            <div className='px-2 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2'>
                {data}
            </div>
            <div className='w-fit px-2 lg:px-0 text-sm lg:text-base'>
                {data.unit}
            </div>

            <div className='px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base'>
                <div className='font-semibold'>
                    {DisplayPriceInTaka(data.price)}
                </div>
                <div className=''>
                    <button className='bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 py-1 rounded'>
                        Add
                    </button>
                </div>
            </div>
        </Link>
    )
}

export default CardProduct