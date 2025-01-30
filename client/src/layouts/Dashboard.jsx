import React from 'react'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    
    <section className='bg-white'>
        <div className='container mx-auto p-3 grid lg:grid-cols-[250px,1fr]'>
            {/* left menu */}
            <div className='py-4 sticky top-24 overflow-auto hidden lg:block border-r'>
                <UserMenu/>
            </div>

            {/* right menu */}
            <div className='bg-white min-h-[75vh]'>
                <Outlet/>
            </div>
        </div>
    </section>
  )
}

export default Dashboard