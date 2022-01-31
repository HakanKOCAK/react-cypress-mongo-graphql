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

Cypress.Commands.add(
  'gqlQuery',
  ({ type = '', opts = {} }) => {
    return cy.intercept('POST', 'http://localhost:4000/graphql', (req) => {
      if (req.body.operationName === 'MyAddresses' && type === 'myAddresses') {
        req.reply((res) => {
          let addresses = []
          if (!opts.isEmpty) {
            // if wanted to be mocked
            addresses = []
          }

          res.body.data.myAddresses = addresses
          res.body.errors = undefined
        })
      } else if (req.body.operationName === 'MyCreditCards' && type === 'myCreditCards') {
        req.reply((res) => {
          let creditCards = []
          if (!opts.isEmpty) {
            // if wanted to be mocked
            creditCards = []
          }

          res.body.data.myCreditCards = creditCards
          res.body.errors = undefined
        })
      } if (req.body.operationName === 'Orders' && type === 'myOrders') {
        req.reply((res) => {
          let orders = [];
          // Will be updated
          if (!opts.isEmpty) {
            // if wanted to be mocked
            orders = []
          }

          if (opts.added) {
            orders = [opts.added];
          }
          res.body.data.orders = orders;
          res.body.errors = undefined
        })
      }
    })
  }
);
