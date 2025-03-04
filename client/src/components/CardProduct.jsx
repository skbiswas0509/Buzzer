import React from 'react'
import { DisplayPriceInTaka } from '../utils/DisplayPriceInTaka'
import { Link } from 'react-router-dom'
import { validURLConvert } from '../utils/validURLConvert'
import { priceWithDiscount } from '../utils/PriceWithDiscount'

const CardProduct = ({ data }) => {
    const url = `/product/${validURLConvert(data.name)}-${data._id}`
    return (
        <Link to={url} className='border py-2 lg:p-4 grid gap-1 lg:gap-2 min-w-36 lg:min-w-52 rounded cursor-pointer bg-white'>
            <div className='min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden'>
                <img src={data.image[0]} alt={data.image} className='w-full h-full object-scale-down lg:scale-125' />
            </div>
            <div className='flex items-center gap-1'>
                <div className='rounded text-xs w-fit p-[1x] px-2 text-green-600 bg-green-50'>
                    10 min
                </div>
                <div>
                    {
                        Boolean(data.discount) && (
                            <p className='text-greeen-600 bg-green-100 px-2 w-fit text-xs rounded-full'>{data.discount}% off</p>
                        )
                    }
                </div>
            </div>
            <div className='px-2 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2'>
                {data}
            </div>
            <div className='w-fit gap-1 px-2 lg:px-0 text-sm lg:text-base'>
                {data.unit}
            </div>

            <div className='px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base'>
                <div className='flex items-center gap-1'>
                    <div className='font-semibold'>
                        {DisplayPriceInTaka(priceWithDiscount(data.price, data.discount))}
                    </div>

                </div>
                <div className=''>
                    {
                        data.stock == 0 ? (
                            <p className='text-red-500 text-sm text-center'>Out of stock</p>
                        ) : (
                            <button className='bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 py-1 rounded'>
                                Add
                            </button>
                        )
                    }
                </div>
            </div>
        </Link>
    )
}

export default CardProduct