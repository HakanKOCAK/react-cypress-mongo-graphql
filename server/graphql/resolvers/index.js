import authResolver from "./auth.js";
import addressResolver from "./address.js";
import creditCardResolver from "./creditCard.js";
import restaurantResolver from "./restaurant.js";
import cartResolver from "./cart.js";

export default {
    ...authResolver,
    ...addressResolver,
    ...creditCardResolver,
    ...restaurantResolver,
    ...cartResolver
};
