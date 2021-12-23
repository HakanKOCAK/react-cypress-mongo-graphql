import authResolver from "./auth.js";
import addressResolver from "./address.js";
import creditCardResolver from "./creditCard.js";
import restaurantResolver from "./restaurant.js";

export default {
    ...authResolver,
    ...addressResolver,
    ...creditCardResolver,
    ...restaurantResolver
};
