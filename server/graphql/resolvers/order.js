import { verifyAccessToken } from "../../helpers/auth.js";
import { getUserOrders, newOrder } from "../../helpers/order.js";
import { getUserById } from "../../helpers/user.js";
import { maskNumber } from "../../helpers/creditCard.js";

const orderResolver = {
  //Get user orders
  orders: async ({ }, { req, _ }) => {
    try {
      //Check if token exists 
      const token = req.headers['authorization'];
      if (!token) throw Error('authorizationDenied');

      //Verify token and if verified check user exists
      const userId = verifyAccessToken({ token });
      await getUserById({ userId });

      const orders = await getUserOrders({ userId });

      return orders.map((o) => ({
        ...o._doc,
        id: o.id,
        //mask credit car number -> ... 0000 0000 -> ... **** 0000
        creditCard: o.creditCard ? maskNumber(o.creditCard) : '',
        createdAt: o.createdAt.toISOString()
      }));
    } catch (error) {

      console.log(error);
      throw error;
    }
  },
  //Create user order
  order: async ({ details }, { req, _ }) => {
    try {
      //Check if token exists 
      const token = req.headers['authorization'];
      if (!token) throw Error('authorizationDenied');

      //Verify token and if verified check user exists
      const userId = verifyAccessToken({ token });
      await getUserById({ userId });

      const order = await newOrder({ details: { ...details, user: userId } });
      return {
        ...order._doc,
        id: order.id,
        creditCard: order.creditCard ? maskNumber(order.creditCard) : '',
        createdAt: order.createdAt.toISOString()
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};

export default orderResolver;
