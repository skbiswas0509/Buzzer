import React, { useEffect, useState } from 'react'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import Loading from '../components/Loading'
import ProductCardAdmin from '../components/ProductCardAdmin'

const [productData, setProductData] = useState([])
const [page, setPage] = useState(1)
const [loading, setLoading] = useState(false)

const fetchProductData = async () => {
    try {
        setLoading(true)
        const response = await Axios({
            ...SummaryApi.getProduct,
            data: {
                page: page,
                limit : 12
            }
        })
        const { data: responseData } = response

        if (responseData.success) {
            setProductData(responseData.data)
        }
    } catch (error) {
        AxiosToastError(Axios)
    } finally {
        setLoading(false)
    }
}

useEffect(() => {
    fetchProductData()
}, [])
const ProductAdmin = () => {
    return (
        <section>
            <div className='p-2 bg-white shadow-md items-center justify-between'>
                <h2 className='font-semibold'>Products</h2>
            </div>
            {
                loading && (
                    <Loading />
                )
            }
            <div className='p-4 bg-blue-50'>
                <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
                    {
                        productData.map((product, index) => {
                            return (
                                <ProductCardAdmin data={product} />
                            )
                        })
                    }
                </div>
                <div className='flex justify-between my-4'>
                    <button className='border border-primary-200 px-4 py-1 hover:bg-primary-200'>Previous</button>
                    <button className='border border-primary-200 px-4 py-1 hover:bg-primary-200'>Next</button>
                </div>
            </div>

        </section>
    )
}

export default ProductAdmin