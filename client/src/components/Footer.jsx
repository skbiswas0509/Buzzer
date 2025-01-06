import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";


const Footer = () => {
  return (
    <Footer className='border-t'>
        <div className="container mx-auto p-4 text-center flex flex-col lg:flex-row lg:jusitfy-between gap-2">
            <p>© All rights reserved 2025!</p>

            <div className='flex items-center gap-4 justify-center text-2xl'>
                <a href="" className='hover:text-primary-100'>
                <FaFacebook />
                </a>
                <a href="" className='hover:text-primary-100'>
                    <FaInstagramSquare/>
                </a>
                <a href="">
                    <FaLinkedin/>
                </a>
            </div>
        </div>
    </Footer>
  )
}

export default Footer