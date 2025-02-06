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

export const updateSubCategoryController = async(request, response)=>{
    try {
        const {_id, name, image, category} = request.body

        const checkSub = await SubCategoryModel.findById(_id)

        if(!checkSub){
            return response.status(400).json({
                message: "Check your id",
                error: true,
                success : false
            })
        }

        const updateSubCategory = await SubCategoryModel.findByIdAndUpdate(_id,{
            name,
            image,
            category
        })

        return response.json({
            message: 'Update Successfull',
            data : updateSubCategory,
            error: false,
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            sucess: false
        })
    }
}

export const deleteSubCategoryController = async(request, response)=>{
    try {
        const {_id} = request.body
        const deleteSubCategory = await SubCategoryModel.findByIdAndDelete(_id)

        return response.status(200).json({
            message : "Deleted successfully",
            data : deleteSubCategory,
            error : false,
            success : true
        })
    } catch (error) { 
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}