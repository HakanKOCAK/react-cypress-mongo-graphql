import { buildSchema } from "graphql";
import authDefs from "./auth.js";
import addressDefs from "./address.js";
import creditCardDefs from "./creditCard.js";

import {
    combineTypes,
    combineQueries,
    combineMutations,
    createSchema
} from "../../helpers/graphqlSchema.js"

const combinedQueries = combineQueries([
    ...authDefs.queries,
    ...addressDefs.queries,
    ...creditCardDefs.queries
]);

const combinedMutations = combineMutations([
    ...authDefs.mutations,
    ...addressDefs.mutations,
    ...creditCardDefs.mutations
]);

const combinedTypes = combineTypes([
    ...authDefs.types,
    ...addressDefs.types,
    ...creditCardDefs.types
]);

const schema = createSchema(combinedTypes, combinedQueries, combinedMutations);

export default buildSchema(schema);
