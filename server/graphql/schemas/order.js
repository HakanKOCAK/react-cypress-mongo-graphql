const Order = `
type Order {
  id: String 
  createdAt: String
  creditCard: String
  deliveryAddress: Address
  items: [CartItem]
  restaurantDetails: Restaurant
  paymentMethod: String
  total: Float
}
`;

const OrderItemInput = `
input OrderItemInput {
  id: String
  drinkType: String
  falafelPieces: Float
  itemType: String!
  name: String!
  optionals: OptionalsInput
  pizzaSizeOption: String
  quantity: Float
  selectedMealDetails: SelectedMealDetailsInput
  sideSizeOption: String
  sweetType: String
  totalPrice: Float
}
`;

const OrderInput = `
input OrderInput {
  creditCard: String
  deliveryAddress: String!
  items: [OrderItemInput!]
  paymentMethod: String!
  restaurant: String!
  total: Float!
}
`;

const orderDefs = {
  types: [
    Order,
    OrderItemInput,
    OrderInput
  ],
  queries: [
    'orders: [Order]'
  ],
  mutations: [
    'order (details: OrderInput!): Order'
  ]
};

export default orderDefs;
