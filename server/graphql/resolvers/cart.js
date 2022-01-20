import { verifyAccessToken } from "../../helpers/auth.js";
import { getUserById } from "../../helpers/user.js";
import { getCartByUserId, addCartItem, updateCartItem, emptyCart, deleteCartItem } from "../../helpers/cart.js";

const cartResolver = {
  //Gets user cart
  cart: async ({ userDistrict }, { req, _ }) => {
    try {
      //Check if token exists 
      const token = req.headers['authorization'];
      if (!token) throw Error('authorizationDenied');

      //Verify token and if verified check user exists
      const userId = verifyAccessToken({ token });
      await getUserById({ userId });

      const cart = await getCartByUserId({ userId, userDistrict });

      return cart;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  //Adds item to user cart
  addCartItem: async ({ item, restaurantId, differentRestaurant }, { req, _ }) => {
    try {
      //Check if token exists 
      const token = req.headers['authorization'];
      if (!token) throw Error('authorizationDenied');

      //Verify token and if verified check user exists
      const userId = verifyAccessToken({ token });
      await getUserById({ userId });

      const cartItem = await addCartItem({ newItem: item, restaurantId, userId, differentRestaurant });
      return cartItem;
    } catch (error) {
      if (error.message !== 'differentRestaurantItem') {
        console.log(error);
      }
      throw error;
    }
  },

  //Clears user cart
  emptyCart: async ({ }, { req, _ }) => {
    try {
      //Check if token exists 
      const token = req.headers['authorization'];
      if (!token) throw Error('authorizationDenied');

      //Verify token and if verified check user exists
      const userId = verifyAccessToken({ token });
      await getUserById({ userId });
      const res = await emptyCart({ userId });
      if (res) return true;
      throw new Error('userCartCouldntFound');
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  //Updates an item in the user cart
  updateCartItem: async ({ itemId, details }, { req, _ }) => {
    try {
      //Check if token exists 
      const token = req.headers['authorization'];
      if (!token) throw Error('authorizationDenied');

      //Verify token and if verified check user exists
      const userId = verifyAccessToken({ token });
      await getUserById({ userId });
      const cartItem = await updateCartItem({ id: itemId, details, userId });
      return cartItem;
    } catch (error) {
      console.log(error)
      throw error;
    }
  },

  //Deletes an item in the user cart
  deleteCartItem: async ({ itemId }, { req, _ }) => {
    try {
      //Check if token exists 
      const token = req.headers['authorization'];
      if (!token) throw Error('authorizationDenied');

      //Verify token and if verified check user exists
      const userId = verifyAccessToken({ token });
      await getUserById({ userId });
      await deleteCartItem({ id: itemId, userId });
      return true;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }
};

export default cartResolver;
