import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    deliveryAddress: {
      type: {
        address: {
          type: String,
          required: true
        },
        city: {
          type: String,
          required: true
        },
        county: {
          type: String,
          required: true
        },
        district: {
          type: String,
          required: true
        },
        flat: {
          type: Number,
          required: true
        },
        floor: {
          type: Number,
          required: true
        }
      },
      required: true
    },

    creditCard: {
      type: String
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

    paymentMethod: {
      type: String,
      required: true
    },

    restaurantDetails: {
      type: {
        city: {
          type: String,
          required: true
        },
        county: {
          type: String,
          required: true
        },
        name: {
          type: String,
          required: true
        }
      },
      required: true
    },

    total: {
      type: Number,
      required: true
    },

    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User'
    },
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Order', orderSchema);