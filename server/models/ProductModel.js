const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String, required: true },
    desc: { type: String, required: true },
    article: { type: String },
    video: { type: String },
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product
