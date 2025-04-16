import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import toast, { Toaster } from 'react-hot-toast';
import fetchUserDetails from "./utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setAllCategory,setAllSubCategory, setLoadingCategory } from "./store/productSlice";
import Axios from "./utils/Axios";
import SummaryApi from "./common/SummaryApi";
import { handleAddItemCart } from "./store/cartProduct";
import GlobalProvider from "./provider/GlobalProvider";
import { FaCartShopping } from "react-icons/fa6";
import CardMobileLink from "./components/CardMobileLink";
import { setUserDetails } from "./store/userSlice";
import { useEffect } from "react";

function App() {

  const dispatch = useDispatch()

  const fetchUser = async ()=>{
    const userData = await fetchUserDetails
    console.log("userData", userData.data)
    dispatch(setUserDetails(userData.data))
  }

  const fetchCategory = async()=>{
    try {
      dispatch(setLoadingCategory(true))
      const response = await Axios({
        ...SummaryApi.getCatgorys
      })   
      const {data : responseData} = response

      if(responseData.success){
        dispatch(setAllCategory(responseData.data))
        // setCategoryData(responseData.data)
      }
    } catch (error) {
      
    }finally{
      dispatch(setLoadingCategory(false))
    }
  }

  const fetchSubCategory = async()=>{
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory
      })
      const {data : responseData} = response
      if(responseData.success){
        dispatch(setAllSubCategory(responseData.data))
      }
    } catch (error) {
      
    }
  }



  useEffect(()=>{
    fetchUser()
    fetchCategory()
    fetchSubCategory()
    //fetchCartItem()
  },[])


  return (
    <GlobalProvider>
      <Header />
      <main className="min-h-[78vh]">
        <Outlet />
      </main>
      <Footer/>
      <Toaster/>
        <CardMobileLink/>
    </GlobalProvider>
  );
}

export default App;
