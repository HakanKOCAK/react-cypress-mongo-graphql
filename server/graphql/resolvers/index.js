import authResolver from "./auth.js";
import addressResolver from "./address.js";
import creditCardResolver from "./creditCard.js";

export default {
    ...authResolver,
    ...addressResolver,
    ...creditCardResolver
};
