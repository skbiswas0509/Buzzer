import CategoryModel from "../models/category.model.js";

export const addCategoryController= async(request, response)=>{
    try {
        const {name, image} = request.body

        if(!name || !image){
            return response.status(400).json({
                message: 'Enter required fields',
                error : true,
                success: false
            })
        }

        const addCategory = new CategoryModel({
            name,
            image
        })
        const saveCategory = await addCategory.save()

        if(!saveCategory){
            return response.status(500).json({
                message: "Not Created",
                error: true,
                success: false
            })
        }
        return response.json({
            message: "Added Category",
            data: saveCategory,
            success: true,
            error: false
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}