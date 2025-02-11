import {createSlice} from "@reduxjs/toolkit"
import SubCategory from "../pages/SubCategory"

const initialValue = {
    allCategory : [],
    loadingCatgory : false,
    allSubCategory : [],
    product : []
}

const productSlice = createSlice({
    name : 'product',
    initialState : initialValue,
    reducers : {
        setAllCategory : (state,action)=>{
            state.allCategory = [...action.payload]
        },
        setLoadingCategory : (state,action)=>{
            state.loadingCatgory = action.payload
        },
        setAllSubCategory : (state,action)=>{
            state.allSubCategory = [...action.payload]
        }
    }
})

export const { setAllCategory, setAllSubCategory, setLoadingCategory } = productSlice.actions

export default productSlice.reducer