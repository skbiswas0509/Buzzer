import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    category: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Category'
        }
    ]
}, {
    timestamps: true
})

const SubCategoryModel = mongoose.model("SubCategory", subCategorySchema)

export default SubCategoryModel