import React, { useState } from 'react'

const UploadProduct = () => {
  const [data ,setData] = useState({
    name : "",
    image : [],
    category : [],
    subCategory : [],
    unit : "", //[]
    stock : "",
    price : "",
    discount : "",
    description : "",
    more_details : {}
  })

  const handleChange = (e)=>{
    const { name, value } = e.target
    
    setData((preve)=>{
      return {
        ...preve,
        [name] : value
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
        </form>
      </div>
    </section>
  )
}

export default UploadProduct