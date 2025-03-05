import cartProductModel from "../models/cartproduct.model.js";
import UserModel from "../models/user.model.js";

export const addToCartItemController = async(request, response)=>{
    try {
        const userId = request.userId
        const {productId} = request.body

        if(!productId){
            return response.status(402).json({
                message : "Provide product Id",
                error : true,
                success : false
            })
        }

        const cartItem  = new cartProductModel({
            quantity : 1,
            userId : userId,
            productId : productId
        })

        const save = await cartItem.save()

        const updateCartUser = await UserModel.updateOne({ _id : userId},{
            $push : {
                shopping_cart : productId
            }
        })

        return response.json({
            data : save,
            message : "Item added successfully",
            error : false,
            sucess : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}