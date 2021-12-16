const CreditCard = `
type CreditCard {
  id: String
  description: String
  issuer: String
  number: String
}
`;

export default {
  types: [CreditCard],
  queries: ['myCreditCards: [CreditCard]'],
  mutations: [
    'addCreditCard(cardNumber: String!, cardHolder: String!, cvc: String!, description: String! expiry: String!, issuer: String): CreditCard',
    'deleteCreditCard (id: String!): String'
  ]
};
