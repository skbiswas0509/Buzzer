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

        const checkItemCart = await cartProductModel.findOne({
            userId : userId,
            productId : productId
        })

        if(checkItemCart){
            return response.status(400).json({
                message : "Item already in cart"
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

export const getCartItemController = async(request, response)=>{
    try {
        const userId = request.userId

        const cartItem = await cartProductModel.find({
            userId : userId,
        }).populate('productId')

        return response.json({
            data : cartItem,
            error : false,
            sucess : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            sucess : false
        })
    }
}

export const updateCartItemQtyController = async(request, response)=>{
    try {
        const userId = request.userId
        const { _id,qty } = request.body

        if(!_id || !qty){
            return response.status(400).json({
                messsage : "Provide _id, qty"
        })
        }
        const updateCartItem = await cartProductModel.updateOne({
            _id : _id,
            userId : userId
        },{
            quantity : qty
        })

        return response.json({
            message : 'Item added',
            error : false,
            sucess : false,
            data : updateCartItem
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const deleteCartItemQtyController = async(request, response)=>{
    try {
        const userId = request.userId
        const {_id } = request.body

        if(!_id){
            return response.status(400).json({
                messahe : "Please provide _id",
                error : true,
                sucess : false
            })
        }

        const deleteCartItem = await cartProductModel.deleteOne({_id : _id, userId : userId})

        return response.json({
            messsage : "Item removed",
            error : false,
            sucess : true,
            data : deleteCartItem
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            sucess : false
        })
    }
}