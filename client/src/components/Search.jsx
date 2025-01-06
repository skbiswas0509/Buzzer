import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';

const Search = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const [isSearchPage, setIsSearchPage] = useState(false)

    useEffect(()=>{
        const isSearch = location.pathname === "/search"
        setIsSearchPage(isSearch)
    },[location])

    
    const redirectToSearchPage = () =>{
        navigate("/search")
    }
  return (
    <div className='w-full min-w-[300px] lg:min-w-[420px] h-10 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50'>
        <button className='flex justify-center items-center h-full p-3'>
            <FaSearch size={22}/>
        </button>
        <div>

        </div>

        <div onClick={redirectToSearchPage}>
            <TypeAnimation
                sequence={[
                    'Search "milk"',
                    1000,
                    'Search "bread"',
                    1000,
                    'Search "sugar"',
                    1000,
                    'Search "rice"',
                    1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
            />
        </div>
    </div>
  )
}

export default Search