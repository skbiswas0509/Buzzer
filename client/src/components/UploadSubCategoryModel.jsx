import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';
import { useSelector } from 'react-redux';

const UploadSubCategoryModel = ({ close }) => {
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
    return (

        <section className='fixed top-0 right-0 bottom-0 left-0  bg-neutral-800 bg-opacity-70 z-50 flex items-center justify-center p-4'>
            <div className='w-full max-w-5xl bg-white p-4 rounded'>
                <div className='flex items-center justify-between gap-3'>
                    <h1 className='font-semibold'>Add Sub Category</h1>
                    <button onClick={close}>
                        <IoClose size={25} />
                    </button>
                </div>
                <form action="" className='my-3 grid gap-3'>
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

                            {/* select category */}
                            <select className='w-full p-2 bg-transparent outline-none'
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
                                <option value={""} disabled>Select Category</option>
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

                </form>
            </div>
        </section>
    )
}

export default UploadSubCategoryModel