import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import SearchPage from '../pages/SearchPage'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ForgotPassword from '../pages/ForgotPassword'
import OtpVerfication from '../pages/OtpVerfication'
import ResetPassword from '../pages/ResetPassword'
import UserMenuMobile from '../pages/UserMenuMobile'
import Dashboard from '../layouts/Dashboard'
import Profile from '../pages/Profile'
import MyOrders from '../pages/MyOrders'
import Address from '../pages/Address'
import CategoryPage from '../pages/CategoryPage'
import SubCategory from '../pages/SubCategory'
import UploadProduct from '../pages/UploadProduct'
import ProductAdmin from '../pages/ProductAdmin'
import AdminPersmission from '../layouts/AdminPersmission'
import ProductListPage from '../pages/ProductListPage'
import ProductDisplayPage from '../pages/ProductDisplayPage'
import CartMobile from '../pages/CartMobile'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "search",
                element : <SearchPage />
            },
            {
                path : "login",
                element : <Login/>
            },
            {
                path : "register",
                element : <Register/>
            },
            {
                path: "forgot-password",
                element : <ForgotPassword/>
            },
            {
                path : "otp-verification",
                element : <OtpVerfication/>
            },
            {
                path : "reset-password",
                element : <ResetPassword/>
            },
            {
                path : "user",
                element : <UserMenuMobile/>
            },
            {
                path : "dashboard",
                element : <Dashboard/>,
                children : [
                    {
                        path : "profile",
                        element : <Profile/>
                    },
                    {
                        path : "myorders",
                        element: <MyOrders/>
                    },
                    {
                        path : "address",
                        element : <Address/>
                    },
                    {
                        path : 'category',
                        element : <AdminPersmission><CategoryPage/></AdminPersmission>
                    },
                    {
                        path : 'subcategory',
                        element : <AdminPersmission><SubCategory/></AdminPersmission>
                    },
                    {
                        path : 'product',
                        element : <AdminPersmission><ProductAdmin/></AdminPersmission>
                    },
                    {
                        path : 'upload-product',
                        element : <AdminPersmission><UploadProduct/></AdminPersmission>
                    }
                ]
            },
            {
                path : ":category",
                children : [
                    {
                        path : ":subcategory",
                        element : <ProductListPage/>
                    }
                ]
            },
            {
                path : "product/:product",
                element : <ProductDisplayPage/>
            },
            {
                path : "cart",
                element : <CartMobile/>
            }
        ]
    }
])

export default router