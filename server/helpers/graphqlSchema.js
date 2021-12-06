export const combineTypes = (types) => types.join('\n');

export const combineQueries = (queries) => `
type Query {
    ${queries.join('\n')}
}`;

export const combineMutations = (mutations) => `
type Mutation {
    ${mutations.join('\n')}
}`;

export const createSchema = (combinedTypes, combinedQueries, combinedMutations) => {
    return `
    ${combinedTypes}\n${combinedQueries}\n${combinedMutations}
    schema {
        query: Query
        mutation: Mutation
    }
    `;
}
