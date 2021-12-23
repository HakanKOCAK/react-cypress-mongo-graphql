const DeliveryDetails = `
type DeliveryDetails {
  minAmount: String,
  estimatedDeliveryTime: String
}
`;

const Restaurant = `
type Restaurant {
  city: String
  county: String
  cuisine: [String]
  deliveryDetails: DeliveryDetails
  image: String
  name: String
  servedDistricts: [String]
}
`;

const restaurantDefs = {
  types: [
    DeliveryDetails,
    Restaurant
  ],
  queries: ['restaurants (city: String!, county: String!, district: String!): [Restaurant]'],
  mutations: []
};

export default restaurantDefs;
