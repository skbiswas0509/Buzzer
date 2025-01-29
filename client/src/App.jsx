import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import toast, { Toaster } from 'react-hot-toast';
import fetchUserDetails from "./utils/fetchUserDetails";
import { setUserDetail } from "./store/userSlice";
import { useDispatch } from "react-redux";

function App() {

  const dispatch = useDispatch()

  const fetchUser = async ()=>{
    const userData = await fetchUserDetails
    console.log("userData", userData.data)
    dispatch(setUserDetail(userData.data))
  }

  userEffect(()=>{
  },[])

  return (
    <>
      <Header />
      <main className="min-h-[78vh]">
        <Outlet />
      </main>
      <Footer/>
      <Toaster/>
    </>
  );
}

export default App;
