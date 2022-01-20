import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    cartTotal: {
      type: Number,
      required: true
    },
    items: {
      type: [
        {
          drinkType: String,
          falafelPieces: Number,
          itemType: {
            type: String,
            required: true
          },
          name: {
            type: String,
            required: true
          },
          optionals: {},
          pizzaSizeOption: String,
          price: {
            type: Number,
            required: true
          },
          quantity: {
            type: Number,
            required: true
          },
          selectedMealDetails: {
            mealPrice: Number,
            name: String,
            size: String,
            totalPrice: Number
          },
          sideSizeOption: String,
          sweetType: String,
          totalPrice: {
            type: Number,
            required: true
          }
        }
      ]
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
      ref: 'User'
    },
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Cart', cartSchema);