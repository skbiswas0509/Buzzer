import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    orderId: {
        type: String,
        required: [true, "order id required"],
        unique: true
    },
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
    },
    product_details: {
        _id: String,
        name: String,
        image: Array,
    },
    paymentId: {
        type: String,
        default: ""
    },
    payment_status: {
        type: String,
        deafult: ""
    },
    delivery_address: {
        type: mongoose.Schema.ObjectId,
        ref: 'Address'
    },
    subTotalAmt: {
        type: Number,
        default: 0
    },
    totalAmt: {
        type: Number,
        default: 0
    },
    invoice_receipt: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
})

const orderModel = mongoose.model("Order", orderSchema)

export default orderModel