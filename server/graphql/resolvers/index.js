import authResolver from "./auth.js";
import addressResolver from "./address.js";

export default {
    ...authResolver,
    ...addressResolver
};
