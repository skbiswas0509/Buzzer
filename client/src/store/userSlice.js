import {createSlice} from '@reduxjs/toolkit';

const initialValue = {
    _id: "",
    name : "",
    email : "",
    avatat: "",
    mobile: "",
    verify_email: "",
    last_login_date: "",
    status: "",
    address_details: [],
    shopping_cart : [],
    orderHistory: [],
    role : ""
}


const userSlice = createSlice({
    name: 'user',
    initialState: initalValue,
    reducers : {
        setUserDetail : (state, action) => {
            state._id = action.payload?._id
            state.anme = action.payload?.name
            state.email = action.payload?.email
            state.avatar = action.payload?.avatar
            state.mobile = action.payload?.mobile
            state.verify_email = action.payload?.verify_email
            state.last_login_date = action.payload?.last_login_date
            state.status = action.payload?.status
            state.address_details = action.payload?.address_details
            state.shopping_cart = action.payload?.shopping_cart
            state.orderHistory = action.payload?.orderHistory
            state.role = action.payload?.role
        },
<<<<<<< HEAD
        updatedAvatar : (state,action)=>{
            state.avatar = action.payload
        },
=======
>>>>>>> 444449e2c771079ff9ebde15df7ca178b4916155
        logout : (state, action) => {
            state._id = ""
            state.anme = ""
            state.email = ""
            state.avatar = ""
            state.mobile = ""
            state.verify_email = ""
            state.last_login_date = ""
            state.status = ""
            state.address_details = []
            state.shopping_cart = []
            state.orderHistory = []
            state.role = "action.payload?.role"
        }
    }
})

<<<<<<< HEAD
export const { setUserDetails ,logout, updatedAvatar } = userSlice.actions
=======
export const { setUserDetails ,logout } = userSlice.actions
>>>>>>> 444449e2c771079ff9ebde15df7ca178b4916155

export default  userSlice.reducer