import { buildSchema } from "graphql";
import authDefs from "./auth.js";
import addressDefs from "./address.js";

import {
    combineTypes,
    combineQueries,
    combineMutations,
    createSchema
} from "../../helpers/graphqlSchema.js"

const combinedQueries = combineQueries([
    ...authDefs.queries,
    ...addressDefs.queries
]);

const combinedMutations = combineMutations([
    ...authDefs.mutations,
    ...addressDefs.mutations
]);

const combinedTypes = combineTypes([
    ...authDefs.types,
    ...addressDefs.types
]);

const schema = createSchema(combinedTypes, combinedQueries, combinedMutations);

export default buildSchema(schema);
