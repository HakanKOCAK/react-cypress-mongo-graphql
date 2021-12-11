import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true
    },

    city: {
      type: String,
      required: true,
      index: true
    },

    county: {
      type: String,
      required: true,
      index: true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },

    district: {
      type: String,
      required: true,
      index: true
    },

    flat: {
      type: Number,
      required: true
    },

    floor: {
      type: Number,
      required: true
    },

    title: {
      type: String,
      required: true,
      lowercase: true,
      enum: {
        values: ['home', 'other', 'work'],
        message: 'invalidAddressTitle'
      }
    },
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Address', addressSchema);