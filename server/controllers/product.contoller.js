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