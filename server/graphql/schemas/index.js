import { buildSchema } from "graphql";
import authDefs from "./auth.js";
import {
    combineTypes,
    combineQueries,
    combineMutations,
    createSchema
} from "../../helpers/graphqlSchema.js"

const combinedQueries = combineQueries([
    ...authDefs.queries
]);

const combinedMutations = combineMutations([
    ...authDefs.mutations
]);

const combinedTypes = combineTypes([
    ...authDefs.types
]);

const schema = createSchema(combinedTypes, combinedQueries, combinedMutations);

export default buildSchema(schema);
