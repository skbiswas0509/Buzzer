import React, { useState } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../utils/UploadImage';
import Loading from '../components/Loading';
import ViewImage from '../components/ViewImage';
import { MdDelete } from "react-icons/md";
import {useSelector} from 'react-redux'
import { IoClose } from 'react-icons/io5';
import AddFieldComponent from '../components/AddFieldComponent';

const UploadProduct = () => {
  const [data ,setData] = useState({
    name : "",
    image : [],
    category : [],
    subCategory : [],
    unit : "",
    stock : "",
    price : "",
    discount : "",
    description : "",
    more_details : {}
  })

  const [imageLoading, setImageLoading] = useState(false)
  const [viewImageUrl, setViewImageUrl] = useState("")
  const allCategory = useSelector(state => state.product.allCategory)
  const [selectCategory, setSelectCategory] = useState("")
  const [selectSubCategory, setSelectSubCategory] = useState("")
  const allSubCategory = useSelector(state=> state.product.allSubCategory)
  const [moreField, setMoreField] = useState([])
  const [openAddField, setOpenAddField] = useState(false)
  
  const handleChange = (e)=>{
    const { name, value } = e.target
    
    setData((preve)=>{
      return {
        ...preve,
        [name] : value
      }
    })
  }

  const handleUploadImage = async(e)=>{
    const file = e.target.files[0]

    if(!file){
      return
    }
    setImageLoading(true)
    const response = await uploadImage(file)

    const { data: imageResponse } = response
    const imageUrl = imageResponse.data.url

    setData(()=>{
      return{
        ...preve,
        image : [...preve.image, imageUrl]
      }
    })
    setImageLoading(false)
  }
  
  const handleDeleteImage = async(index)=>{
    data.image.splice(index,1)
    setData((preve)=>{
      return{
        ...preve
      }
    })
  }

  const handleRemoveCategory = async(index)=>{
    data.category.splice(index,1)
    setData(()=>{
      return{
        ...preve
    }
    })
  }
  
  const handleRemoveSubCategory = async(index)=>{
    data.subCategory.splice(index,1)
    setData(()=>{
      return{
        ...preve
      }
    })
  }

  return (
    <section>
      <div className='p-2 bg-white shadow-md items-center justify-between'>
        <h2 className='font-semibold'>Upload Products</h2>
      </div>
      <div className='grid p-3'>
        <form action="" className='grid gap-2'>
          <div className='grid gap-1'>
            <label htmlFor="name">Name</label>
            <input id='name' type="text" placeholder='Enter product name' 
            name='name' value={data.name} onChange={handleChange} required
            className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'/>
          </div>
          <div className='grid gap-1'>
            <label htmlFor="description">description</label>
            <textarea id='description' type="text" placeholder='Enter product description' 
            name='description' value={data.description} onChange={handleChange} required multiple rows={2}
            className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded resize-none'/>
          </div>
      <div>
        <p>Image</p>
        <div>
        <label htmlFor='productImage' className='bg-blue-100 h-24 border rounded flex justify-center items-center cursor-pointer'>
          <div className='text-center flex justify-center items-center flex-col'>
            {
              imageLoading ? <Loading/> : (
                <>
                <FaCloudUploadAlt size={35}/>
                <p>Upload Image</p>
                </>
              )
            }
          </div>
          <input type="file" id='productImage' className='hidden' accept='image/*' onChange={handleUploadImage}/>
        </label>
        </div>
        {/* display uploaded images */}
        <div className='flex flex-wrap gap-4'>
          {
            data.image.map((img,index)=>{
            return(
              <div key={img+index} className='h-20 mt-1 w-20 min-w-20 bg-blue-50 border relative group'>
                <img src={img} alt={img} className='w-full h-full object-scale-down cursor-pointer' onClick={()=>setViewImageUrl(img)}/>
                <div onClick={()=>handleDeleteImage(index)} className='absolute right-0 bottom-0 p-1 bg-red-500 hover:bg-red-600 rounded text-white hidden group-hover:block cursor-pointer'>
                  <MdDelete />
                </div>
              </div>
            )})
          }
        </div>
        
      </div>
      <div className='grid gap-1'>
        <label>Category</label>
        <div>
          <select className='bg-blue-50 border w-full p-2 rounded'>
            value={selectCategory}
            onChange={(e)=>{
              const value = e.target.vaue
              const category = allCategory.find(el=> el._id === value)

              setData((preve)=>{
                return{
                  ...preve,
                  category : [...preve.category, category]
              }
              })
              setSelectCategory("")
            }}
            <option value={""}>Select Category</option>
            {
              allCategory.map((c,indez)=>{
                return(
                  <option value={c?._id}>{c.name}</option>
                )
              })
            }
          </select>
          <div className='flex flex-wrap gap-3'>
          {
            data.category.map((c,index)=>{
              return(
                <div key={c._id+index+"productsection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                  <p>{c.name}</p>
                  <div className='hover:text-red-500 cursor-pointer' onClick={()=>handleRemoveCategory(index)}>
                    <IoClose size={20}/>
                  </div>
                </div>
              )
            })
          }
          </div>
        </div>
      </div>
      <div className='grid gap-1'>
        <label>Subcategory</label>
        <div>
          <select className='bg-blue-50 border w-full p-2 rounded'>
            value={selectSubCategory}
            onChange={(e)=>{
              const value = e.target.vaue
              const subCategory = allSubCategory.find(el=> el._id === value)

              setData((preve)=>{
                return{
                  ...preve,
                  subCategory : [...preve.subCategory, subCategory]
              }
              })
              setSelectSubCategory("")
            }}
            <option value={""} className='text-neutral-600'>Select Sub Category</option>
            {
              allSubCategory.map((c,indez)=>{
                return(
                  <option value={c?._id}>{c.name}</option>
                )
              })
            }
          </select>
          <div className='flex flex-wrap gap-3'>
          {
            data.subCategory.map((c,index)=>{
              return(
                <div key={c._id+index+"productsection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                  <p>{c.name}</p>
                  <div className='hover:text-red-500 cursor-pointer' onClick={()=>handleRemoveSubCategory(index)}>
                    <IoClose size={20}/>
                  </div>
                </div>
              )
            })
          }
          </div>
        </div>
      </div>
      <div className='grid gap-1'>
        <label htmlFor="unit">Unit</label>
        <input id='unit' type="text" placeholder='Enter product unit' 
        name='unit' value={data.unit} onChange={handleChange} required
        className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'/>
      </div>
      <div className='grid gap-1'>
        <label htmlFor="stock">Stock</label>
        <input id='stock' type="number" placeholder='Number of stock' 
        name='stock' value={data.stock} onChange={handleChange} required
        className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'/>
      </div>
      <div className='grid gap-1'>
        <label htmlFor="price">Price</label>
        <input id='price' type="number" placeholder='Enter product price' 
        name='price' value={data.price} onChange={handleChange} required
        className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'/>
      </div>
      <div className='grid gap-1'>
        <label htmlFor="discount">Discount</label>
        <input id='discount' type="number" placeholder='Enter product discount' 
        name='discount' value={data.discount} onChange={handleChange} required
        className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'/>
      </div>
      
      {/* add more fields */}
      <div onClick={()=>setOpenAddField(true)} className='bg-primary-200 hover:bg-white py-1 px-3 w-32 text-center font-semibold border border-primary-200 hover:text-neutral-900 cursor-pointer rounded'>
        Add Fields
      </div>
      </form>
      </div>
      {
        viewImageUrl && (
          <ViewImage url={viewImageUrl} close={()=>{setViewImageUrl("")}}/>
        )
      }
      {
        openAddField && (
          <AddFieldComponent close={()=>setOpenAddField(false)}/>
        )
      }
    </section>
  )
}

export default UploadProduct