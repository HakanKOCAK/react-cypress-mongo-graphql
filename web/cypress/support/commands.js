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
  districts: ['Arnavutkoy', 'Bebek', 'Konaklar', 'Kultur', 'Levent', 'Yildiz']
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