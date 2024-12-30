import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name required"]
    },
    email: {
        type: String,
        required: [true, "email required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password required"]
    },
    avatar: {
        type: String,
        default: ""
    },
    mobile: {
        type: Number,
        default: null,
    },
    refresh_token: {
        type: String,
        default: ""
    },
    verify_email: {
        type: Boolean,
        default: false
    },
    last_login_date: {
        type: Date,
        default: ""
    },
    status: {
        type: String,
        enum: ["Active", "Inactive", "Suspended"],
        default: "Active"
    },
    address_details: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Address'
        }
    ],
    shopping_cart : [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'CartProduct'
        }
    ],
    orderHistory: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Order'
        }
    ],
    forgot_password_otp: {
        type: String,
        default: null
    },
    forget_password_expiry: {
        type: Date,
        default: null,
    },
    roll: {
        type: String,
        enum : ["ADMIN", "USER"],
        default: "USER"
    }
}, {
    timestamps: true
})

const UserModel = mongoose.model("User", userSchema)

export default UserModel