import Cart from "../models/Cart.js";
import { getMenu, getRestaurantById } from "./restaurant.js";
import _ from "lodash";

//Gets cart items and restaurant menu
const prettifyItems = ({ items = [], menu = {} }) => {
  const prettified = [];

  //Returns the needed keys to be added as prettified item.
  const itemTypeFieldMap = (type, name) => {
    if (type === 'falafel') {
      return {
        itemFields: [
          'selectedMealDetails',
          'falafelPieces'
        ],
        menuFields: [
          { key: `falafels.${name}`, onlyValue: true },
          { key: 'falafelPieceDetails', onlyValue: false, displayKey: 'falafelPieceDetails' },
          { key: 'mealDetails.falafel', onlyValue: false, displayKey: 'mealDetails' },
          { key: 'ingredients', onlyValue: false, displayKey: 'ingredients' }
        ]
      };
    } else if (type === 'side') {
      return {
        itemFields: [
          'sideSizeOption'
        ],
        menuFields: [
          { key: `sides.${name}.sizeDetails`, onlyValue: false, displayKey: 'sizeDetails' }
        ]
      };
    } else if (type === 'drink') {
      return {
        itemFields: [
          'drinkType'
        ],
        menuFields: [
          { key: `drinks.${name}`, onlyValue: true }
        ]
      };
    } else if (type === 'sweet') {
      return {
        itemFields: [
          'sweetType'
        ],
        menuFields: [
          { key: `sweets.${name}`, onlyValue: true }
        ]
      };
    } else if (type === 'kebab') {
      return {
        itemFields: [
          'selectedMealDetails',
          'optionals'
        ],
        menuFields: [
          { key: `kebabs.${name}.optionals`, onlyValue: false, displayKey: 'optionals' },
          { key: 'mealDetails.kebab', onlyValue: false, displayKey: 'mealDetails' },
          { key: `kebabs.${name}.sides`, onlyValue: false, displayKey: 'sides' }
        ]
      };
    } else if (type === 'hamburger') {
      return {
        itemFields: [
          'selectedMealDetails',
          'optionals'
        ],
        menuFields: [
          { key: `hamburgers.${name}.optionals`, onlyValue: false, displayKey: 'optionals' },
          { key: 'mealDetails.hamburger', onlyValue: false, displayKey: 'mealDetails' },
          { key: `hamburgers.${name}.ingredients`, onlyValue: false, displayKey: 'ingredients' }
        ]
      };
    } else if (type === 'pizza') {
      return {
        itemFields: [
          'selectedMealDetails',
          'pizzaSizeOption',
          'optionals'
        ],
        menuFields: [
          { key: `pizzas.${name}.optionals`, onlyValue: false, displayKey: 'optionals' },
          { key: 'mealDetails.pizza', onlyValue: false, displayKey: 'mealDetails' },
          { key: 'pizzaSizeDetails', onlyValue: false, displayKey: 'pizzaSizeDetails' },
          { key: `pizzas.${name}.ingredients`, onlyValue: false, displayKey: 'ingredients' }
        ]
      };
    }

    return { itemFields: [], menuFields: [] };
  }

  items.forEach((item) => {
    //Get needed keys
    const fields = itemTypeFieldMap(item.itemType, item.name);

    //Before an item would've look like this
    // item = {
    //   drinkType: null,
    //   falafelPieces: 3,
    //   totalPrice: 10,
    //   quantity: 2,
    //   name: 'falafel',
    //   price: 2,
    //   pizzaSizeOption: null,
    //   .
    //   .
    //   .
    // }
    //Add id, quantity and totalPrice of cart item as default.
    const data = {
      id: item._id,
      quantity: item.quantity,
      totalPrice: item.totalPrice
    };

    //Add what is needed.
    fields.itemFields.forEach((key) => {
      data[key] = item[key]
    });

    //Here item looks like this
    // item = {
    //   falafelPieces: 3,
    //   totalPrice: 10,
    //   quantity: 2
    // }
    data.item = { itemType: item.itemType };

    let itemDetails = { name: item.name, price: item.price };

    //To extend item with menu details 
    //For instance a cart item would look like this
    fields.menuFields.forEach((item) => {
      const val = _.get(menu, item.key);
      if (val) {
        if (item.onlyValue) {
          itemDetails = { ...itemDetails, ...val };
        } else {
          itemDetails = { ...itemDetails, [item.displayKey]: val };
        }
      }
    });
    data.item.itemDetails = itemDetails;

    //Here item looks like this with menu details of given item
    // item = {
    //   falafelPieces: 3,
    //   totalPrice: 10,
    //   quantity: 2,
    //   item: {
    //     itemType: 'falafel',
    //     itemDetails: {
    //       price: 2,
    //       name: 'falafel',
    //       mealDetails: [
    //         {
    //           name: 'meal0',
    //           price: 2,
    //           includes: ['fries']
    //         }
    //       ],
    //       .
    //       .
    //       .
    //     }
    //   }
    // }
    prettified.push(data);
  })
  return prettified;
};

export const createUserCart = ({ userId = '' }) => new Cart({ user: userId, cartTotal: 0 });

export const getCartByUserId = async ({ userId = '', userDistrict = '', byUser = true }) => {
  try {
    //Find the cart of the user
    const cart = await Cart.findOne({ user: userId });

    //Throw error if cart is not exists
    if (!cart) {
      throw new Error('userCartCouldntFound');
    }

    //This is to check if cart is requested from end user
    //If so, prettify cart details... If not, return reference of the cart to be updated
    //Check update / delete / add / empty functions below.
    if (!byUser) return cart;

    //Deletes restaurant and user key/value pairs of cart
    const prettified = Object.entries(cart._doc).reduce((reduced, [key, value]) => {
      const copy = { ...reduced };
      if (key !== 'restaurant' && key !== 'user') {
        copy[key] = value;
      }
      return copy;
    }, {});

    //If restaurant is not null which means that user has an item from a restaurant in his/her cart.
    if (cart.restaurant) {
      //Get restaurant details
      const restaurantDetails = await getRestaurantById({ id: cart.restaurant, district: userDistrict });
      if (restaurantDetails) {
        //Get menu of the restaurant
        const menu = await getMenu({ id: cart.restaurant });

        //Add restaurant and menu details to prettified object
        prettified.restaurantDetails = restaurantDetails;
        prettified.menu = menu;

        //Prettify cart items
        prettified.items = prettifyItems({ items: _.cloneDeep(prettified.items), menu: _.cloneDeep(menu) });
      }
    }

    //Add cart id to prettified object
    prettified.id = cart._id;
    return prettified;
  } catch (error) {
    throw error;
  }
};

//Adds an item to user cart
export const addCartItem = async ({ newItem = {}, restaurantId = '', userId = '', differentRestaurant = false }) => {
  try {

    //Get user cart -> byUser: false means that we need reference of the cart 
    const cart = await getCartByUserId({ userId, byUser: false });

    //This will be returned value of this function
    let cartItem = null;

    //Check if cart exists and throw error if not
    if (cart) {
      //Check if cart doesnt have an item or incoming item is from different restaurant
      if (_.isEmpty(cart.items) || differentRestaurant) {
        //Clear items and create new items array
        cart.items = [newItem];

        //Add restaurant id
        cart.restaurant = restaurantId;

        //Clear cart total
        cart.cartTotal = newItem.totalPrice;

        //Save cart and return added object
        await cart.save();
        cartItem = cart.items[0];
      } else if (cart.restaurant && cart.restaurant.toString() !== restaurantId) {
        //Check if restaurant ids dont match throw error
        throw new Error('differentRestaurantItem')
      } else {
        //If the item belongs the same restaurant

        //1. Check if same item exists in the cart
        const indexOf = cart.items.findIndex((item) => _.isEqual(
          //Quantity and totalPrice might be difference so ignore -- _id will be ignored from already saved item
          _.omit(item._doc, ['_id', 'quantity', 'totalPrice']),
          _.omit(newItem, ['quantity', 'totalPrice'])
        ));

        //If an item found
        if (indexOf > -1) {
          //Update its quantity and totalPrice
          cart.items[indexOf].quantity += newItem.quantity;
          cart.items[indexOf].totalPrice += newItem.totalPrice;
          //return updated version
          cartItem = cart.items[indexOf];
        } else { //If not found
          //Push item to items array and return new item.
          const index = cart.items.push(newItem);
          cartItem = cart.items[index - 1];
        }

        //Update cart total save cart
        cart.cartTotal += newItem.totalPrice;
        await cart.save();
      }
    } else {
      throw new Error('userCartCouldntFound');
    }
    return cartItem;
  } catch (error) {
    throw error;
  }
};

export const emptyCart = async ({ userId = '' }) => {
  try {
    //Check if cart exists
    const cart = await Cart.findOne({ user: userId });

    if (cart) {
      //Clear cart items
      cart.items = [];

      //Delete restaurant id
      cart.restaurant = null;

      //Clear cart total and save
      cart.cartTotal = 0;
      await cart.save();
      return true;
    }

    return false;
  } catch (error) {
    throw error;
  }
}

export const updateCartItem = async ({ id = '', details = {}, userId = '' }) => {
  try {
    //Check if cart exists and throw error if not
    const cart = await getCartByUserId({ userId, byUser: false });
    if (!cart) throw new Error('userCartCouldntFound');

    //Find the item that will be updated
    const index = cart.items.findIndex((item) => item.id === id);
    if (index > -1) {
      //Copy total of incoming item
      const total = details.totalPrice;

      //Copy previous cart total
      const cartTotal = cart.cartTotal;

      //Update cart total
      cart.cartTotal = cartTotal - cart.items[index].totalPrice + total;

      //Update item details and save cart
      cart.items[index] = { ...details, _id: id };
      await cart.save();
    } else {
      //If not found throw error.
      throw new Error('specifiedItemDoesNotExistsInTheCard');
    }
    return cart.items[index];
  } catch (error) {
    throw error;
  }
};

export const deleteCartItem = async ({ id = '', userId = '' }) => {
  try {
    //Check if cart exists and throw error if not
    const cart = await getCartByUserId({ userId, byUser: false });
    if (!cart) throw new Error('userCartCouldntFound');

    //Find the item that will be deleted
    const index = cart.items.findIndex((item) => item.id === id);
    if (index > -1) {
      //Decrease cart total
      cart.cartTotal -= cart.items[index].totalPrice;

      //Delete item
      cart.items.splice(index, 1);

      //If there is no item left in the cart -> delete restaurant details
      if (cart.items.length === 0) {
        cart.restaurant = null;
      }

      //Save cart
      await cart.save();
    } else {
      //If not found throw error.
      throw new Error('specifiedItemDoesNotExistsInTheCard');
    }
    return true;
  } catch (error) {
    throw error;
  }
};
