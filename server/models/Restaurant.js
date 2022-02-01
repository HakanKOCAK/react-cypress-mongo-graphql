import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      index: true,
      required: true
    },

    county: {
      type: String,
      index: true,
      required: true
    },

    cuisine: {
      type: [String],
      index: true,
      required: true
    },

    deliveryDetails: {
      type: {},
      isRequired: true
    },

    district: {
      type: String,
      index: true,
      required: true
    },

    image: {
      type: String,
      required: true
    },

    name: {
      type: String,
      required: true
    },

    servedDistricts: {
      type: [String],
      index: true,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Restaurant', restaurantSchema);