import {createSlice} from "@reduxjs/toolkit"
import SubCategory from "../pages/SubCategory"

const initialValue = {
    allCategory : [],
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
        setAllSubCategory : (state,action)=>{
            state.allSubCategory = [...action.payload]
        }
    }
})

export const { setAllCategory, setAllSubCategory } = productSlice.actions

export default productSlice.reducer