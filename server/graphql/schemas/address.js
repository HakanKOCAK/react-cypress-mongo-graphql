const Address = `
type Address {
  id: String
  address: String
  city: String,
  county: String
  district: String
  flat: Int
  floor: Int
  title: String
}
`;

const addressDefs = {
  types: [Address],
  queries: ['myAddresses: [Address]', 'cities: [String]', 'counties (city: String!): [String], districts (city: String!, county: String!): [String]'],
  mutations: [
    'addAddress (address: String!, city: String!, county: String!, district: String!, flat: Int!, floor: Int!, title: String!): Address',
    'deleteAddress (id: String!): String'
  ]
};

export default addressDefs