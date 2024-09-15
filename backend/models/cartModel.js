const mongoose = require("mongoose"); // Erase if already required
const { Schema } = mongoose;

const cartProduct = new mongoose.Schema(
  {
    quantity: { type: Number, required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  },
  {
    _id: false,
  }
);

// Declare the Schema of the Mongo model
var cartSchema = new mongoose.Schema({
  products: [{ type: cartProduct }],
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["active", "process", "discarded"] },
});

//Export the model
module.exports = mongoose.model("Cart", cartSchema);
