import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import SummaryApi from '../common/SummaryApi'
import Axios from "../utils/Axios"
import AxiosToastError from '../utils/AxiosToastError'


const ProductDisplayPage = () => {
  const params = useParams()
  let productId = params?.product?.split("-")?.slice(-1)[0]
  const [data,setData] = useState({
    name : "",
    image : []
  })
  const [image ,setImage] = useState(0)
  const [loading, setLoading] = useState(false)

  const fetchProductDetails = async()=>{
    try {
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data : {
          productId : productId
        }
      })

      const {data: responseData} = response

      if(response.success){
        setData(responseData.data)
      }
    } catch (error) {
      AxiosToastError(error)
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchProductDetails()
  },[params])

  return (
    <section className='container mx-auto p-4 grid lg:grid-cols-2'>
      <div className=''>
        <div className='bg-white min-h-[70vh] lg:max-h-[70vh] roundedmax-h-56 h-full w-full'>
          <img src={data.image[image]} alt="" className='w-full h-full object-scale-down'/>
        </div>
        <div className='flex items-center justify-center gap-3 my-2'>
          {
            data.image.map((img,index)=>{
              return(
                <div key={img+index+"point"} className={`bg-slate-200 w-3 h-3 lg:w-5 lg:h-5 rounded-full ${index === image && "bg-slate-300"}`}></div>
              )
            })
          }
        </div>
          <div className='grid'>
            <div className='flex gap-4 w-full overflow-x-auto scrollbar-none'>
              {
                data.image.map((img,index)=>{
                  return(
                    <div className='h-20 w-20 min-h-20 min-w-2- cursor-pointer shadow-md' key={image+index}>
                      <img src={img} alt="min-product" onClick={()=>setImage(index)} className='w-full h-full objects-scale-downd'/>
                    </div>
                  )
                })
              }
            </div>
          </div>
      </div>

      <div>

      </div>
    </section>
  )
}

export default ProductDisplayPage