import Order from "../models/Order.js";
import CreditCard from "../models/CreditCard.js";
import Restaurant from "../models/Restaurant.js";
import Address from "../models/Address.js";

//Gets user orders
export const getUserOrders = async ({ userId = '' }) => {
  try {
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    return orders;
  } catch (error) {
    throw error;
  }
};

//Create new user order
export const newOrder = async ({ details = {} }) => {
  try {
    let orderDetails = {};

    //Check if payment method is equal to online and set credit card number
    if (details.paymentMethod === 'online') {
      //Check if credit card is exists
      const creditCard = await CreditCard.findOne({ _id: details.creditCard, createdBy: details.user });
      if (!creditCard) {
        throw new Error('creditCardCouldntFound');
      }

      //add card number to order details
      orderDetails.creditCard = creditCard.number;
    }

    //Check if restaurant exists
    const restaurant = await Restaurant.findById(details.restaurant);
    if (!restaurant) throw new Error('restaurantCouldntFound');

    //Check if given address exists
    const deliveryAddress = await Address.findOne({ _id: details.deliveryAddress, createdBy: details.user });
    if (!deliveryAddress) throw new Error('deliveryAddressCouldntFound');

    orderDetails = {
      ...orderDetails,
      deliveryAddress: {
        address: deliveryAddress.address,
        city: deliveryAddress.city,
        county: deliveryAddress.county,
        district: deliveryAddress.district,
        flat: deliveryAddress.flat,
        floor: deliveryAddress.floor
      },
      items: details.items,
      paymentMethod: details.paymentMethod,
      restaurantDetails: {
        city: restaurant.city,
        county: restaurant.county,
        name: restaurant.name
      },
      total: details.total,
      user: details.user
    }
    const order = new Order({ ...orderDetails });
    await order.save();

    return order;
  } catch (error) {
    throw error;
  }
};
