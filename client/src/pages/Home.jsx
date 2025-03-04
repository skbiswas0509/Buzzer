import React from 'react'
import banner from '../assets/banner.jpg'
import banner_mobile from '../assets/banner_mobile.jpg'
import { useSelector } from 'react-redux'
import { validURLConvert } from '../utils/validURLConvert'
import { Link, useNavigate } from 'react-router-dom'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'

const Home = () => {
  const loadinCategory = useSelector(state=> state.product.loadingCatgory)
  const categoryData = useSelector(state => state.product.allCategory)
  const subCategoryData = useSelector(state => state.product.allSubCategory)
  const navigate = useNavigate()
  
  const handleRedirectProductListPage = (id, cat)=>{
    const subcategory = subCategoryData.find(sub =>{
      const filter = sub.category.some(c => {
        return c._id == id
      })

      return filterData ? true : null
    })
  
    const url = `/${validURLConvert(cat)}-${_id}/${validURLConvert(subcategory.name)}-${subcategory._id}`
    
    navigate(url)
  }

  return (
    <section className='bg-white'>
      <div className='container mx-auto'>
        <div className={`w-full h-full min-h-48 bg-blue-100 rounded ${!banner &&  "animate-pulse my-2"}`}>
          <img src={banner} className='w-full h-full hidden lg:block' alt="banner" />
          <img src={banner_mobile} className='w-full h-full lg:hidden' alt="banner_mobile" />
        </div>
      </div>

      <div className='container mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2'>
        {
          loadinCategory ? (
            new Array(12).fill(null).map((c,index)=>{
              return(
                <div key={index+"loadingcategory"} className='bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse'>
                  <div className='bg-blue-100 min-h-24 rounded'></div>
                  <div className='bg-blue-100 h-8 rounded'></div>
                </div>
              )
            })
          ) : (
            categoryData.map((cat,index)=>{
              return(
              <div key={cat._id+"displayCategory"} className='w-full h-full' onClick={()=>handleRedirectProductListPage(cat._id,cat._name)}>
                <div>
                  <img src={cat.image} alt="" className='w-full h-full object-scale-down'/>
                </div>
              </div>
              )
            })
          )
        }
      </div>

      {/* display category product */}
      {
        categoryData.map((c,index)=>{
          <CategoryWiseProductDisplay key={c?._id+"CategorywiseProduct"} id={c?._id} name={c?.name}/>

        })
      }

    </section>
  )
}

export default Home