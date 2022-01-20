// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const defaults = {
  addresses: [
    {
      id: '0',
      address: 'Home adress',
      city: 'Istanbul',
      county: 'Besiktas',
      district: 'Bebek',
      flat: 2,
      floor: 3,
      title: 'home'
    },

    {
      id: '1',
      address: 'Other address',
      city: 'Ankara',
      county: 'Cankaya',
      district: 'Bilkent',
      flat: 2,
      floor: 3,
      title: 'other'
    }
  ],
  cards: [
    {
      id: '0',
      description: 'My Visa Card',
      number: '************1111',
      issuer: 'visa'
    },

    {
      id: '1',
      description: 'My Mastercard',
      number: '************2222',
      issuer: 'mastercard'
    }
  ],
  cities: [
    'Ankara',
    'Istanbul',
    'Izmir'
  ],
  counties: [
    'Besiktas',
    'Kadikoy'
  ],
  districts: ['Arnavutkoy', 'Bebek', 'Konaklar', 'Kultur', 'Levent', 'Yildiz'],
  menu: {
    hamburger: {
      drinks: {
        coke: null,
        fruitJuice: { price: 3, types: ['cherry', 'orange', 'peach'], '__typename': 'Drink' },
        iceTea: { price: 3, types: ['lemon', 'peach'], '__typename': 'Drink' },
        sprite: { price: 3, types: ['light', 'normal'], '__typename': 'Drink' },
        water: null,
        '__typename': 'Drinks'
      },
      falafelPieceDetails: null,
      falafels: null,
      hamburgers: {
        cheeseburger: null,
        chickenburger: null,
        doubleCheeseburger: null,
        doubleChickenburger: null,
        doubleHamburger: null,
        doubleQuarterPounder: null,
        hamburger: {
          price: 8,
          includes: ['beef', 'pickles', 'ketchup', 'mustard'],
          optionals: ['pickles', 'ketchup', 'mustard'],
          '__typename': 'Hamburger'
        },
        quarterPounder: {
          price: 10,
          includes: ['beef', 'cheddarCheese', 'pickles', 'onions', 'ketchup', 'mustard'],
          optionals: ['pickles', 'onions', 'ketchup', 'mustard'],
          '__typename': 'Hamburger'
        }
      },
      kebabs: null,
      mealDetails: {
        falafel: null,
        hamburger: [
          {
            includes: ['drink', 'fries'],
            name: 'meal0',
            priceDetails: {
              price: 4.5,
              sizePriceConstant: 4,
              '__typename': "MealPriceDetails"
            },
            '__typename': "MealDetail"
          }
        ],
        kebab: null,
        pizza: null,
        '__typename': "MealDetails"
      },
      id: 'menuId2',
      pizzaSizeDetails: null,
      pizzas: null,
      sauces: {
        bbq: 0.7,
        buffalo: 0.7,
        honeyMustard: 0.7,
        ketchup: 0.7,
        mayonnaise: 0.7,
        mustard: 0.7,
        ranch: 0.7,
        sweetNSour: 0.7,
        tartar: 0.7,
        __typename: "Sauces"
      },
      sides: {
        chickenFries: {
          price: 7,
          sizeDetails: {
            options: ['4pcs', '6pcs', '8pcs'],
            sizePriceConstant: 3,
            __typename: "SideSizeDetails"
          },
          __typename: "Side"
        },
        fries: {
          price: 5,
          sizeDetails: {
            options: ['small', 'medium', 'large'],
            sizePriceConstant: 3,
            __typename: "SideSizeDetails"
          },
          __typename: "Side"
        },
        mozzarellaSticks: null,
        nuggets: null,
        onionRings: {
          price: 6,
          sizeDetails: {
            options: ['4pcs', '6pcs', '8pcs'],
            sizePriceConstant: 3,
            __typename: "SideSizeDetails"
          },
          __typename: "Side"
        },
        '__typename': 'Sides'
      },
      sweets: null,
      '__typename': 'Menu'
    },
    pizza: {
      drinks: {
        coke: { price: 3, types: ['zero'], '__typename': 'Drink' },
        fruitJuice: { price: 3, types: ['cherry'], '__typename': 'Drink' },
        iceTea: null,
        sprite: null,
        water: null,
        '__typename': 'Drinks'
      },
      falafelPieceDetails: null,
      falafels: null,
      hamburgers: null,
      id: 'menuId',
      kebabs: null,
      mealDetails: null,
      pizzaSizeDetails: {
        sizePriceConstant: 6.5,
        sizes: ['small', 'medium', 'large'],
        '__typename': 'PizzaSizeDetails'
      },
      pizzas: {
        bbqChicken: null,
        hawaiian: {
          includes: ['mozzarella', 'pineapple', 'ham'],
          optionals: ['ham'],
          price: 11,
          '__typename': 'Pizza'
        },
        margherita: {
          includes: ['mozzarella', 'tomatoes', 'basil'],
          optionals: ['tomatoes', 'basil'],
          price: 10,
        },
        meaty: null,
        pepperoni: null,
        vegetarian: null,
        '__typename': 'Pizza'
      },
      sauces: {
        ketchup: 0.7,
        bbq: null,
        buffalo: 0.7,
        honeyMustard: 0.7,
        mayonnaise: 0.7,
        mustard: null,
        ranch: 0.7,
        sweetNSour: 0.7,
        tartar: null,
        '__typename': 'Sauces'
      },
      sides: {
        chickenFries: {
          price: 7,
          sizeDetails: {
            options: ['4pcs', '6pcs', '8pcs'],
            sizePriceConstant: 3,
            '__typename': 'SideSizeDetails'
          },
          '__typename': 'Side'
        },
        fries: {
          price: 5,
          sizeDetails: {
            options: ['small', 'medium', 'large'],
            sizePriceConstant: 3,
            '__typename': 'SideSizeDetails'
          },
          '__typename': 'Side'
        },
        mozzarellaSticks: {
          price: 6,
          sizeDetails: {
            options: ['4pcs', '6pcs', '8pcs'],
            sizePriceConstant: 3,
            '__typename': 'SideSizeDetails'
          },
          '__typename': 'Side'
        },
        nuggets: {
          price: 7,
          sizeDetails: {
            options: ['4pcs', '6pcs', '8pcs'],
            sizePriceConstant: 3,
            '__typename': 'SideSizeDetails'
          },
          '__typename': 'Side'
        },
        onionRings: null,
        __typename: "Sides"
      },
      sweets: null,
      '__typename': 'Menu'
    }
  },
  restaurants: [
    {
      city: "Istanbul",
      county: "Besiktas",
      cuisine: ['Pizza'],
      deliveryDetails: {
        estimatedDeliveryTime: 45,
        minAmount: 15
      },
      id: '0',
      image: 'pizza.svg',
      name: 'Pizza Test Restaurant',
      servedDistricts: ['Arnavutkoy', 'Bebek', 'Konaklar', 'Kultur']
    },
    {
      city: "Istanbul",
      county: "Besiktas",
      cuisine: ['Hamburger'],
      deliveryDetails: {
        estimatedDeliveryTime: 40,
        minAmount: 20
      },
      id: '1',
      image: 'burger.svg',
      name: 'Hamburger Test Restaurant',
      servedDistricts: ['Arnavutkoy', 'Bebek', 'Konaklar', 'Kultur']
    }
  ]
};

Cypress.Commands.add(
  'refreshToken',
  () => cy.intercept('http://localhost:4000/refresh_token', {
    body: {
      accessToken: 'accessToken'
    }
  })
)

Cypress.Commands.add(
  'gqlQuery',
  ({ type = '', opts = {} }) => {
    return cy.intercept('POST', 'http://localhost:4000/graphql', (req) => {
      if (req.body.operationName === 'Me' && type === 'me') {
        req.reply((res) => {
          res.body.data.me = {
            id: 'randomId',
            email: 'random@mail.com',
            name: 'Hakan',
            surname: 'Kocak'
          }
        })
      } else if (req.body.operationName === 'MyAddresses' && type === 'myAddresses') {
        req.reply((res) => {
          let addresses = []
          if (!opts.isEmpty) {
            addresses = defaults.addresses
          }

          res.body.data.myAddresses = addresses
          res.body.errors = undefined
        })
      } else if (req.body.operationName === 'MyCreditCards' && type === 'myCreditCards') {
        req.reply((res) => {
          let cards = []
          if (!opts.isEmpty) {
            cards = defaults.cards
          }

          res.body.data.myCreditCards = cards
          res.body.errors = undefined
        })
      } else if (req.body.operationName === 'Cities' && type === 'cities') {
        req.reply((res) => {
          res.body.data.cities = defaults.cities
        })
      } else if (req.body.operationName === 'Counties' && type === 'counties') {
        req.reply((res) => {
          res.body.data.counties = defaults.counties
        })
      } else if (req.body.operationName === 'Districts' && type === 'districts') {
        req.reply((res) => {
          res.body.data.districts = defaults.districts
        })
      } else if (req.body.operationName === 'Restaurants' && type === 'restaurants') {
        req.reply((res) => {
          let restaurants = [];

          if (!opts.isEmpty) {
            restaurants = defaults.restaurants;
          }

          res.body.data.restaurants = restaurants
          res.body.errors = undefined
        })
      } else if (req.body.operationName === 'Menu' && type === 'menu') {
        req.reply((res) => {
          let menu = {};

          //Set requested restaurant's menu based on the type. 
          //Currently there is only pizza and hamburger menu for test purposes
          if (opts.pizza) {
            menu = defaults.menu.pizza;
          } else if (opts.hamburger) {
            menu = defaults.menu.hamburger;
          }

          res.body.data.menu = menu
          res.body.errors = undefined
        })
      }
    })
  }
);

Cypress.Commands.add(
  'gqlMutation',
  ({ type, opts, variables }) => {
    return cy.intercept('POST', 'http://localhost:4000/graphql', (req) => {
      if (req.body.operationName === 'Login' && type === 'login') {
        req.reply((res) => {
          res.body.data.login = {
            ...variables,
            '__typename': 'AuthData'

          }
          res.body.errors = undefined
        });
      } else if (req.body.operationName === 'Register' && type === 'register') {
        req.reply((res) => {
          res.body.data.register = {
            ...variables,
            '__typename': 'AuthData'

          }
          res.body.errors = undefined
        });
      } else if (req.body.operationName === 'AddCreditCard' && type === 'addCreditCard') {
        req.reply((res) => {
          res.body.data.addCreditCard = {
            id: opts.isEmpty ? '0' : defaults.cards.length.toString(),
            ...variables,
            '__typename': 'CreditCard'

          }
          res.body.errors = undefined
        })
      } else if (req.body.operationName === 'DeleteCreditCard' && type === 'deleteCreditCard') {
        req.reply((res) => {
          res.body.data.deleteCreditCard = variables.id;
          res.body.errors = undefined;
        })
      } else if (req.body.operationName === 'AddAddress' && type === 'addAddress') {
        req.reply((res) => {
          res.body.data.addAddress = {
            id: opts.isEmpty ? '0' : defaults.addresses.length.toString(),
            ...variables,
            '__typename': 'Address'

          }
          res.body.errors = undefined
        })
      } else if (req.body.operationName === 'DeleteAddress' && type === 'deleteAddress') {
        req.reply((res) => {
          res.body.data.deleteAddress = variables.id
          res.body.errors = undefined
        })
      }
    });
  }
)