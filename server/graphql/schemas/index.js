import { buildSchema } from "graphql";
import authDefs from "./auth.js";
import addressDefs from "./address.js";
import creditCardDefs from "./creditCard.js";
import restaurantDefs from "./restaurant.js";
import cartDefs from "./cart.js";
import orderDefs from "./order.js";

import {
    combineTypes,
    combineQueries,
    combineMutations,
    createSchema
} from "../../helpers/graphqlSchema.js"

const combinedQueries = combineQueries([
    ...authDefs.queries,
    ...addressDefs.queries,
    ...creditCardDefs.queries,
    ...restaurantDefs.queries,
    ...cartDefs.queries,
    ...orderDefs.queries
]);

const combinedMutations = combineMutations([
    ...authDefs.mutations,
    ...addressDefs.mutations,
    ...creditCardDefs.mutations,
    ...restaurantDefs.mutations,
    ...cartDefs.mutations,
    ...orderDefs.mutations
]);

const combinedTypes = combineTypes([
    ...authDefs.types,
    ...addressDefs.types,
    ...creditCardDefs.types,
    ...restaurantDefs.types,
    ...cartDefs.types,
    ...orderDefs.types
]);

const schema = createSchema(combinedTypes, combinedQueries, combinedMutations);

export default buildSchema(schema);
