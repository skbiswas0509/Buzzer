import { request, response } from "express";
import SubCategoryModel from "../models/subCategory.model.js";

export const AddSubCategoryController = async(request, response)=>{
    try {
        const {name, image, category} = request.body
        if(!name && !image &&!category[0]){
            return response.status(400).json({
                message: "Provide name, image and category",
                error: true,
                success: false
            })
        }

        const payload = {
            name,
            image,
            category
        }

        const createSubCategory = new SubCategoryModel(payload)
        const save = await createSubCategory.save()

        return response.json({
            message: 'Sub category created added',
            data: save,
            error: false,
            success: true
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const getSubCategoryController = async(request, response)=>{
    try {
        const data = await SubCategoryModel.find().sort({createdAt : -1}).populate('category')
        return response.json({
            message: "Sub category data",
            data: data,
            error: false,
            success: true
    })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}