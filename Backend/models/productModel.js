const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: [true, "Please add a name"],
        trim: true
    },
    sku: {
        type: String,
        required: true,
        default: "SKU",
        trim: true
    },
    category: {
        type: String,
        required: [true, "Please add a category"],
        trim: true
    },
    quantity: {
        type: String,
        required: [true, "Please add a quantity"],
        trim: true
    },
    price: {
        type: String,
        required: [true, "Please add a price"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please add a description"],
        trim: true
    },
    image: {
        fileName: {
            type: String,
            default: ""
        },
        filePath: {
            type: String,
            default: ""
        },
        fileType: {
            type: String,
            default: ""
        },
        fileSize: {
            type: String,
            default: ""
        },
        public_id: {
            type: String,
            default: ""
        }
    },
    
        production_date: {
            type: String,
        required: [true, "Please add production date"],
        trim: true
        },
        expiry_date: {
            type: String,
        required: [true, "Please add expiry date"],
        trim: true
        }
    
  },
  {
    timestamps: true,
})

const Product = mongoose.model("Product", productSchema);
module.exports = Product;


