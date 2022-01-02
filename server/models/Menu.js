import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    drinks: {
      type: {}
    },

    falafels: {
      type: {}
    },

    falafelPieceDetails: {
      type: {}
    },

    hamburgers: {
      type: {}
    },

    kebabs: {
      type: {}
    },

    mealDetails: {
      type: {}
    },

    pizzas: {
      type: {}
    },

    pizzaSizeDetails: {
      type: {}
    },

    restaurant: {
      type: mongoose.Types.ObjectId,
      ref: 'Restaurant',
      unique: true
    },

    sauces: {
      type: {}
    },

    sweets: {
      type: {}
    },

    sides: {
      type: {}
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Menu', menuSchema);