const DeliveryDetails = `
type DeliveryDetails {
  minAmount: Int,
  estimatedDeliveryTime: Int
}
`;

const Restaurant = `
type Restaurant {
  id: String
  city: String
  county: String
  cuisine: [String]
  deliveryDetails: DeliveryDetails
  image: String
  name: String
  servedDistricts: [String]
}
`;

const Drink = `
type Drink {
  price: Float,
  types: [String]
}
`;

const Drinks = `
type Drinks {
  coke: Drink
  fruitJuice: Drink
  iceTea: Drink
  water: Drink
  sprite: Drink
}
`;

const Falafel = `
type Falafel {
  price: Float
  ingredients: [String]
}
`;

const Falafels = `
type Falafels {
  classic: Falafel
  rawCarrot: Falafel
  mexican: Falafel
  sweetPotato: Falafel
}
`;

const FalafelPieceDetails = `
type FalafelPieceDetails {
  pieces: [Float]
  sizePriceConstant: Float
}
`;

const Hamburger = `
type Hamburger {
  price: Float
  ingredients: [String]
  optionals: [String]
}
`;

const Hamburgers = `
type Hamburgers {
  hamburger: Hamburger
  cheeseburger: Hamburger
  chickenburger: Hamburger
  quarterPounder: Hamburger
  doubleHamburger: Hamburger
  doubleCheeseburger: Hamburger
  doubleChickenburger: Hamburger
  doubleQuarterPounder: Hamburger
}
`;

const Kebab = `
type Kebab {
  price: Float
  optionals: [String]
  sides: [String]
}
`;

const Kebabs = `
type Kebabs {
  chickenDonerKebab: Kebab
  steakDonerKebab: Kebab
  shishKebab: Kebab
  chickenShishKebab: Kebab
  adanaKebab: Kebab
  iskenderKebab: Kebab
  kibbeh: Kebab
}
`;


const MealPriceDetails = `
type MealPriceDetails {
  price: Float
  sizePriceConstant: Float
}
`;

const MealDetail = `
type MealDetail {
  name: String
  includes: [String]
  priceDetails: MealPriceDetails
}
`;

const MealDetails = `
type MealDetails {
  hamburger: [MealDetail]
  pizza: [MealDetail]
  kebab: [MealDetail]
  falafel: [MealDetail]
}
`;

const Pizza = `
type Pizza {
  price: Float
  ingredients: [String]
  optionals: [String]
}
`;

const Pizzas = `
type Pizzas {
  margherita: Pizza
  pepperoni: Pizza
  hawaiian: Pizza
  vegetarian: Pizza
  bbqChicken: Pizza
  meaty: Pizza
}
`;

const PizzaSizeDetails = `
type PizzaSizeDetails {
  sizes: [String]
  sizePriceConstant: Float
}
`;

const Sauces = `
type Sauces {
  ketchup: Float
  mayonnaise: Float
  bbq: Float
  ranch: Float
  mustard: Float
  honeyMustard: Float
  sweetNSour: Float
  buffalo: Float
  tartar: Float
}
`;

const Sweet = `
type Sweet {
  price: Float
  types: [String] 
}
`;

const Sweets = `
type Sweets {
  souffle: Sweet
  cookie: Sweet
  iceCream: Sweet
  pie: Sweet
}
`;

const SideSizeDetails = `
type SideSizeDetails {
  options: [String]
  sizePriceConstant: Float
}
`;

const Side = `
type Side {
  price: Float
  sizeDetails: SideSizeDetails
}
`;

const Sides = `
type Sides {
  fries: Side
  nuggets: Side
  onionRings: Side
  chickenFries: Side
  mozzarellaSticks: Side
}
`;

const Menu = `
type Menu {
  id: String
  drinks: Drinks
  falafels: Falafels
  falafelPieceDetails: FalafelPieceDetails
  hamburgers: Hamburgers
  kebabs: Kebabs
  mealDetails: MealDetails
  pizzas: Pizzas
  pizzaSizeDetails: PizzaSizeDetails
  sauces: Sauces
  sweets: Sweets
  sides: Sides
}
`;

const restaurantDefs = {
  types: [
    DeliveryDetails,
    Restaurant,
    Drink,
    Drinks,
    Falafel,
    Falafels,
    FalafelPieceDetails,
    Hamburger,
    Hamburgers,
    Kebab,
    Kebabs,
    MealPriceDetails,
    MealDetail,
    MealDetails,
    Pizza,
    Pizzas,
    PizzaSizeDetails,
    Sauces,
    Sweet,
    Sweets,
    SideSizeDetails,
    Side,
    Sides,
    Menu
  ],
  queries: [
    'restaurants (city: String!, county: String!, district: String!): [Restaurant]',
    'menu (id: String): Menu'
  ],
  mutations: []
};

export default restaurantDefs;
