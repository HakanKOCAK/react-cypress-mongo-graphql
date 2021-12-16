import mongoose from "mongoose";

const creditCardSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },

    cvc: {
      type: Number,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    expiry: {
      type: String,
      required: true
    },

    holder: {
      type: String,
      required: true
    },

    issuer: {
      type: String
    },

    number: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('CreditCard', creditCardSchema);