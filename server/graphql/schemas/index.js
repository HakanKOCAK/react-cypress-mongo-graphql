import { buildSchema } from "graphql";
import authDefs from "./auth.js";
import addressDefs from "./address.js";
import creditCardDefs from "./creditCard.js";
import restaurantDefs from "./restaurant.js";

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
    ...restaurantDefs.queries
]);

const combinedMutations = combineMutations([
    ...authDefs.mutations,
    ...addressDefs.mutations,
    ...creditCardDefs.mutations,
    ...restaurantDefs.mutations
]);

const combinedTypes = combineTypes([
    ...authDefs.types,
    ...addressDefs.types,
    ...creditCardDefs.types,
    ...restaurantDefs.types
]);

const schema = createSchema(combinedTypes, combinedQueries, combinedMutations);

export default buildSchema(schema);
