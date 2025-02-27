import React, { useEffect, useState } from 'react'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import Loading from '../components/Loading'
import ProductCardAdmin from '../components/ProductCardAdmin'
import { IoSearch } from "react-icons/io5";
import EditProductAdmin from '../components/EditProductAdmin'


const [productData, setProductData] = useState([])
const [page, setPage] = useState(1)
const [loading, setLoading] = useState(false)
const [totalPageCount, setTotalPageCount] = useState(1)
const [search, setSearch] = useState("")

const fetchProductData = async () => {
    try {
        setLoading(true)
        const response = await Axios({
            ...SummaryApi.getProduct,
            data: {
                page: page,
                limit : 12,
                search : search 
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
}, [page])

const handleNext =()=>{
    if(page !== totalPageCount){
    setPage(preve => preve + 1)
    }
}
const handlePrevious =()=>{
    if(page > 1){
    setPage(preve => preve - 1)
    }
}

const handleOnChange = ()=>{
    const {value} = e.target
    setSearch(value)
    setPage(1)
}

useEffect(()=>{
    let flag = true

    const interval = setTimeout(() => {
        if(flag){
            fetchProductData()
            flag = false
        }
    }, 300);
    
    return ()=>{
        clearTimeout(interval)
    }
},[search])

const ProductAdmin = () => {
    return (
        <section>
            <div className='p-2 bg-white shadow-md flex items-center justify-between gap-4'>
                <h2 className='font-semibold'>Products</h2>
                <div className='h-full min-w-24 max-w-56 w-full ml-auto bg-blue-50 px-4 flex items-center gap-3 py-2 rounded border focus-within:bg-primary-200'>
                    <IoSearch size={25}/>
                    <input type="text" placeholder='Search product here...'
                    className='h-full w-full outline-none bg-transparent'/>
                </div>
            </div>
            {
                loading && (
                    <Loading />
                )
            }
            <div className='p-4 bg-blue-50'>
                <div className='min-h-[55vh]'>
                    <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
                        {
                            productData.map((product, index) => {
                                return (
                                    <ProductCardAdmin data={product} fetchProductData={fetchProductData}/>
                                )
                            })
                        }
                    </div>
                </div>
                
                <div className='flex justify-between my-4'>
                    <button onClick={handlePrevious} className='border border-primary-200 px-4 py-1 hover:bg-primary-200'>Previous</button>
                    <button className='w-full bg-slate-100'>{page}/{totalPageCount}</button>
                    <button onClick={handleNext} 
                    className='border border-primary-200 px-4 py-1 hover:bg-primary-200'
                    value={search}
                    onChange={handleOnChange}
                    >Next</button>
                </div>
            </div>
            
        </section>
    )
}

export default ProductAdmin