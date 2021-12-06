const AuthData = `
type AuthData {
    id: String
    email: String
    name: String
    surname: String
    accessToken: String
}`;

const authDefs = {
    types: [AuthData],
    queries: ['me: AuthData'],
    mutations: ['register(name: String!, surname: String!, email: String!, password: String!): AuthData', 'login(email: String!, password: String!): AuthData']
};

export default authDefs;