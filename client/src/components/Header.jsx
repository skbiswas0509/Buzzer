import React, { useEffect } from "react";
import logo from "../assets/logo.png";
import Search from "./Search";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoCartSharp } from "react-icons/io5";
import { VscTriangleDown } from "react-icons/vsc";
import { VscTriangleUp } from "react-icons/vsc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useMobile from "../hooks/useMobile";
import { useState } from "react";
import UserMenu from "./UserMenu";
import { DisplayPriceInTaka } from "../utils/DisplayPriceInTaka";
import { useGlobalContext } from "../provider/GlobalProvider";
import DisplayCartItem from "./DisplayCartItem";
import { useSelector } from "react-redux";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const cartItem = useSelector(state => state.cartItem.cart)
  // const [totalPrice, setTotalPrice] = useState(0)
  // const [totalQty, setTotalQty] = useState(0)
  const { totalPrice,totalQty } = useGlobalContext()
  const [openCartSection, setOpenCartSection] = useState(false)

  const redirectToLoginPage = () => {
    navigate("/login");
  }


  const handleCloseUserMenu = ()=>{
    setOpenUserMenu(false)
  }

  const handleMobileUser=()=>{
    if(!user._id){
      navigate("/login")
      return 
    }
    navigate("/user")
  }

  //total items and total price
  // useEffect(()=>{
  //   const qty = cartItem.reduce((preve,curr)=>{
  //     return preve + curr.quantity
  //   },0)
  //   setTotalQty(qty)
    
  //   const tPrice = cartItem.reduce((preve,curr)=>{
  //     return preve + (curr.productId.price * curr.quantity)
  //   },0)
  //   setTotalPrice(tPrice)
  // },[cartItem])

  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center px-2 justify-between">
          {/* logo */}
          <div className="h-full">
            <Link to={"/"} className="h-full flex justify-center items-center">
              <img
                src={logo}
                width={160}
                height={60}
                alt="logo"
                className="hidden lg:block"
              />
              <img
                src={logo}
                width={120}
                height={60}
                alt="logo"
                className="lg:hidden"
              />
            </Link>
          </div>
          {/* search */}
          <div className="hidden lg:block">
            <Search />
          </div>

          {/* login and mycart */}
          <div>
            {/* user icon  will be displayed in only mobile  */}
            <button className="text-neutral-600 lg:hidden" onClick={handleMobileUser}>
              <FaRegCircleUser size={25} />
            </button>

            {/* user icon  will be displayed in only desktop */}
            <div className="hidden lg:flex items-center gap-10">
              {user?._id ? (
                <div className="relative">
                  <div
                    onClick={() => setOpenUserMenu((preve) => !preve)}
                    className="flex select-nne items-center gap-1 cursor-pointer"
                  >
                    <p>Account</p>
                    {openUserMenu ? (
                      <VscTriangleUp size={22} />
                    ) : (
                      <VscTriangleDown size={22} />
                    )}
                  </div>
                  {openUserMenu && (
                    <div className="absolute right-0 top-12">
                      <div className="bg-white rounded p-4 min-w-52 lg:shadow-lg">
                        <UserMenu close={handleCloseUserMenu}/>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={redirectToLoginPage} className="text-lg px-2">
                  Login
                </button>
              )}
              <button onClick={()=>setOpenCartSection(true)} className="flex items-center gap-2 bg-green-800 hover:bg-green-700 px-4 py-2 rounded text-white">
                <div className="animate-bounce">
                  {/* add to cart icon */}
                  <IoCartSharp size={26} />
                </div>
                <div className="font-semibold text-sn">
                  {
                    cartItem[0] ? (
                      <div>
                        <p>{totalQty} Items</p>
                        <p>{DisplayPriceInTaka(totalPrice)}</p>
                      </div>
                    ) : (
                      <p>My cart</p>
                    )
                  }
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>

      {
        openCartSection && (
          <DisplayCartItem close={()=>{setOpenCartSection(false)}}/>
        )
      }
    </header>
  );
};

export default Header;
