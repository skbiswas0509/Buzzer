import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';
import { useSelector } from 'react-redux';
import { IoCloseSharp } from "react-icons/io5";
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';

const UploadSubCategoryModel = ({ close, fetchData }) => {
    const [subCategoryData, setSubCategoryData] = useState({
        name: "",
        image: "",
        category: []
    })
    const allCategory = useSelector(state=> state.product.allCategory)

    const handleChange = (e) => {
        const { name, value } = e.target

        setSubCategoryData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleUploadSubCategoryImage = async (e) => {
        const file = e.target.files[0]

        if (!file) {
            return
        }
        const response = await uploadImage(file)
        const { data: imageResponse } = response

        setSubCategoryData((preve) => {
            return {
                ...preve,
                image: imageResponse.data.url
            }
        })
    }

    const handleSubmitSubCategory =  async(e)=>{
        e.preventDefault()
        try {
            const response = await Axios({
                ...SummaryApi.createSubCategory,
                data: subCategoryData
            })

            const {data: responseData} =response
            if(responseData.success){
                toast.success(responseData.success)
                if(close){
                    close()
                }
                if(fetchData){
                    fetchData()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    const handleRemoveCategorySelected = (categoryId)=>{
        const index = subCategoryData.category.findIndex(e1 => e1._id === categoryId)
        subCategoryData.category.splice(index,1)
        setSubCategoryData((preve)=>{
            return {
                ...preve
            }
        })
    }
    return (

        <section className='fixed top-0 right-0 bottom-0 left-0  bg-neutral-800 bg-opacity-70 z-50 flex items-center justify-center p-4'>
            <div className='w-full max-w-5xl bg-white p-4 rounded'>
                <div className='flex items-center justify-between gap-3'>
                    <h1 className='font-semibold'>Add Sub Category</h1>
                    <button onClick={close}>
                        <IoClose size={25} />
                    </button>
                </div>
                <form action="" className='my-3 grid gap-3' onSubmit={handleSubmitSubCategory}>
                    <div className='grid gap-1'>
                        <label htmlFor="name">Name</label>
                        <input id='name' name='name' value={subCategoryData.name} onClick={handleChange} className='p-3 bg-blue-50 border outline-none focus-within:border-x-primary-200
                        rounded'/>
                    </div>
                    <div className='grid gap-1'>
                        <p>Sub Category Image</p>
                        <div className='flex flex-col lg:flex-row items-center gap-3'>
                            <div className='border h-36 w-full lg:w-36 bg-blue-50 flex items-center justify-center'>
                                {
                                    !subCategoryData.image ? (
                                        <p className='text-sm text-neutral-400'>No image</p>
                                    ) : (
                                        <img src={subCategoryData.image} alt="altsubcategory" className='w-full h-full object-scale-down' />
                                    )
                                }
                            </div>
                            <label htmlFor="uploadSubCategoryImage">
                                <div className='px-4 py-1 border border-primary-100 text-primary-200 rounded hover:bg-primary-200 hover:text-neutral-900 cursor-pointer'>
                                    Upload Image
                                </div>
                                <input type="file" id='uploadSubCategoryImage' className='hidden' onChange={handleUploadSubCategoryImage} />
                            </label>

                        </div>
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor="">Select Category</label>
                        <select name="" id="" className='bg-blue-50 border p-3'>
                            <option value={""}>Select Category</option>
                        </select>
                    </div>
                    <div className='grid gap-1'>
                        <label>Select category</label>
                        <div className='border focus:within:border-primary-200 rounded'>
                            {/* display value */}
                            <div className='flex float-wrap'>
                                {
                                subCategoryData.category.map((cat,index)=>{
                                    return(
                                        <p key={cat._id+"selectedValue"} className='bg-white shadow-md px-1 m-1 flex items-center gap-2'>
                                            {cat.name}
                                            <div className='cursor-pointer hover:text-red-600' onClick={()=>handleRemoveCategorySelected(cat._id)}>
                                                <IoCloseSharp size={20}/>
                                            </div>
                                        </p>
                                    )
                                })
                                }
                            </div>
                            {/* select category */}
                            <select className='w-full p-2 bg-transparent outline-none border'
                            onChange={(e)=>{
                                const value = e.target.value
                                const categoryDetails = allCategory.find(e1 => e1._id == value)

                                setSubCategoryData(()=>{
                                    return{
                                        ...preve,
                                        category : [...preve.category, categoryDetails]
                                    }
                                })
                            }}>
                                <option value={""}>Select Category</option>
                                {
                                    allCategory.map((category,index)=>{
                                        return(
                                            <option value={category?._id} key={category._id+"subceategory"}>{category?.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>

                    <button className={`px-4 py-1 border
                        ${subCategoryData?.name && subCategoryData?.image && subCategoryData?.category[0] ? "bg-primary-200 hover:bg-primary-100" : "bg-gray-200"}
                        font-semibold
                    `}>Submit</button>
                </form>
            </div>
        </section>
    )
}

export default UploadSubCategoryModel