const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    link: { type: String, required: true },
    desc: { type: String, required: true },
    article: { type: String },
    video: { type: String },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product
