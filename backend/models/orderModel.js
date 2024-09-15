const mongoose = require("mongoose"); // Erase if already required
const { Schema } = mongoose;

const paymentMethods = {
  values: ["card", "cash"],
  message: "enum validator failed for payment Methods",
};
// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
  {
    items: { type: [Schema.Types.Mixed], required: true },
    totalAmount: { type: Number },
    totalItems: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    paymentMethod: { type: String, required: true, enum: paymentMethods },
    paymentStatus: { type: String, default: "pending" },
    status: { type: String, default: "pending" },
    selectedAddress: { type: Schema.Types.Mixed, required: true },
    trackingLink: { type: String },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Order", orderSchema);
