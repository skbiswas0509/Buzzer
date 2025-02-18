import ProductModel from "../models/product.model.js";

export const createProductController = async(request, response)=>{
    try {
        const {name,
            image,
            category,
            subCategory,
            unit,
            stock,
            price,
            discount,
            description,
            more_details
        } = request.body

        if(!name || !image[0] || !category[0] || !subCategory[0] || !unit || !stock || !price || !discount || !description)
        {
            return response.status(400).json({
                message : "Enter required  fields",
                error : true,
                success : false
            })
        }

        const product = new ProductModel({
            name,
            image,
            category,
            subCategory,
            unit,
            stock,
            price,
            discount,
            description,
            more_details
        })

        const saveProduct = await product.save()

        return response.json({
            message: "Product Created sucesssfully",
            data : saveProduct,
            error: false,
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

export const getProductController = async(request, response)=>{
    try {
        let {page, limit, search } = request.body

        if(!page){
            page = 1
        }

        if(!limit){
            limit = 10
        }

        const query = search ? {
            $text : {
                $search : search
            }
        } : {}

        const skip = (page - 1) * limit

        const [data, totalCount] = await Promise.all([
            ProductModel.find(query).sort({createdAt : -1}).skip(skip).limit(limit),
            ProductModel.countDocuments(query)
        ])

        return response.json({
            message : "Product data",
            error: false,
            success : true,
            totalCount : totalCount,
            totalNoPage : Math.ceil(totalCount / limit),
            data : data
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const getProductByCategory = async(request, response)=>{
    try {
        const { id } = request.body
        if(!id){
            return response.status(400).json({
                message :  "Please provide category id",
                error : true,
                success : false
            })
        }

        const product = await ProductModel.find({
            category : {$in : id}
        }).limit(15)

        return response.json({
            message : "category product list",
            data : product,
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

export const getProductByCategoryAndSubCategory = async (request, response)=>{
    try {
        const {categoryId, subCategoryId, page, limit} = request.body

        if(!categoryId || !subCategoryId){
            return response.status(400).json({
                message : "provide categoryId and subcategoryId",
                error : true,
                success : false
            })
        }

        if(!page){
            page = 1
        }

        if(!limit){
            limit = 10
        }

        const query = {
            category : {$in : categoryId},
            subCategory : {$in : subCategoryId}
        }

        const skip = (page -1) * limit
        const [data, dataCount] = await Promise.all([
            ProductModel.find(query).sort({createdAt : -1}).skip().limit(limit),
            ProductModel.countDocuments(query)
        ])

        return response.json({
            message : "Product List",
            data : data,
            totalCount : dataCount,
            page : page,
            limit : limit,
            error : false,
            success : false
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const getProductDetails = async(request, response)=>{
    try {
        const {productId} = request.body

        const product = await ProductModel.findOne({_id : productId})

        return response.json({
            message : "Product details",
            data : product,
            error : false,
            success : true,
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
} 