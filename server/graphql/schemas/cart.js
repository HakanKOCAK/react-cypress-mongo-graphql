const CartMealDetails = `
type CartMealDetails {
  includes: [String]
  name: String
  priceDetails: MealPriceDetails
}
`;


const MealPriceDetailsInput = `
input MealPriceDetailsInput {
  price: Float
  sizePriceConstant: Float
}
`;

const CartMealDetailsInput = `
input CartMealDetailsInput {
  includes: [String]
  name: String
  priceDetails: MealPriceDetailsInput
}
`;

const CartSizeDetails = `
type CartSizeDetails {
  options: [String]
  sizePriceConstant: Float
}
`;

const CartSizeDetailsInput = `
input CartSizeDetailsInput {
  options: [String]
  sizePriceConstant: Float
}
`;

const ItemDetails = `
type ItemDetails {
  falafelPieceDetails: FalafelPieceDetails
  ingredients: [String]
  mealDetails: [CartMealDetails]
  name: String!
  optionals: [String]
  pizzaSizeDetails: PizzaSizeDetails
  price: Float!
  sides: [String]
  sizeDetails: CartSizeDetails
  types: [String]
}
`;

const FalafelPieceDetailsInput = `
input FalafelPieceDetailsInput {
  pieces: [Float]
  sizePriceConstant: Float
}
`;

const PizzaSizeDetailsInput = `
input PizzaSizeDetailsInput {
  sizes: [String]
  sizePriceConstant: Float
}
`;

const ItemDetailsInput = `
input ItemDetailsInput {
  falafelPieceDetails: FalafelPieceDetailsInput
  ingredients: [String]
  mealDetails: [CartMealDetailsInput]
  name: String!
  optionals: [String]
  pizzaSizeDetails: PizzaSizeDetailsInput
  price: Float!
  sides: [String]
  sizeDetails: CartSizeDetailsInput
  types: [String]
}
`;

const Item = `
type Item {
  itemDetails: ItemDetails
  itemType: String!
}
`;

const Optionals = `
type Optionals {
  basil: Boolean
  greenPeppers: Boolean
  ham: Boolean
  ketchup: Boolean
  lettuce: Boolean
  mayonnaise: Boolean
  mushrooms: Boolean
  mustard: Boolean
  onions: Boolean
  pickles: Boolean
  redOnion: Boolean
  tomatoes: Boolean
  sweetCorn: Boolean
}
`;

const OptionalsInput = `
input OptionalsInput {
  basil: Boolean
  greenPeppers: Boolean
  ham: Boolean
  ketchup: Boolean
  lettuce: Boolean
  mayonnaise: Boolean
  mushrooms: Boolean
  mustard: Boolean
  onions: Boolean
  pickles: Boolean
  redOnion: Boolean
  tomatoes: Boolean
  sweetCorn: Boolean
}
`;


const SelectedMealDetails = `
type SelectedMealDetails {
  mealPrice: Float
  name: String
  size: String
  totalPrice: Float
}
`;

const SelectedMealDetailsInput = `
input SelectedMealDetailsInput {
  mealPrice: Float
  name: String
  size: String
  totalPrice: Float
}
`;

const CartItem = `
type CartItem {
  id: String
  drinkType: String
  falafelPieces: Float
  item: Item
  itemType: String
  name: String
  optionals: Optionals
  pizzaSizeOption: String
  price: Float
  quantity: Float
  selectedMealDetails: SelectedMealDetails
  sideSizeOption: String
  sweetType: String
  totalPrice: Float
}
`;

const CartItemInput = `
input CartItemInput {
  drinkType: String
  falafelPieces: Float
  itemType: String!
  name: String!
  optionals: OptionalsInput
  pizzaSizeOption: String
  price: Float!
  quantity: Float!
  selectedMealDetails: SelectedMealDetailsInput
  sideSizeOption: String
  sweetType: String
  totalPrice: Float!
}
`;

const Cart = `
type Cart {
  id: String
  cartTotal: Float!
  items: [CartItem]
  menu: Menu
  restaurantDetails: Restaurant
}
`;

const cartDefs = {
  types: [
    CartMealDetails,
    CartMealDetailsInput,
    CartSizeDetails,
    CartSizeDetailsInput,
    FalafelPieceDetailsInput,
    ItemDetails,
    ItemDetailsInput,
    Item,
    MealPriceDetailsInput,
    Optionals,
    OptionalsInput,
    PizzaSizeDetailsInput,
    SelectedMealDetails,
    SelectedMealDetailsInput,
    CartItem,
    CartItemInput,
    Cart
  ],
  queries: [
    'cart(userDistrict: String): Cart'
  ],
  mutations: [
    'addCartItem(item: CartItemInput!, restaurantId: String!, differentRestaurant: Boolean!): CartItem',
    'emptyCart: Boolean',
    'updateCartItem(itemId: String!, details: CartItemInput!): CartItem',
    'deleteCartItem(itemId: String!): Boolean'
  ]
};

export default cartDefs;
