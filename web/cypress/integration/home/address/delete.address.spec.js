/// <reference types="cypress" />

describe('Delete Address', () => {
  beforeEach(() => {
    //Go to home
    cy.visit('/home');

    //Assume there is an authenticated user
    cy.intercept('http://localhost:4000/refresh_token', {
      body: {
        accessToken: 'accessToken'
      }
    }).as('refreshToken');

    cy.intercept('POST', 'http://localhost:4000/graphql', (req) => {
      if (req.body.operationName === 'Me') {
        req.reply((res) => {
          res.body.data.me = {
            id: 'randomId',
            email: 'random@mail.com',
            name: 'Hakan',
            surname: 'Kocak'
          }
        })
      }
    }).as('gqlMeQuery')

    cy.intercept('POST', 'http://localhost:4000/graphql', (req) => {
      if (req.body.operationName === 'MyAddresses') {
        req.reply((res) => {
          res.body.data.myAddresses = [
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
              address: 'Address to be deleted',
              city: 'Ankara',
              county: 'Cankaya',
              district: 'Bilkent',
              flat: 2,
              floor: 3,
              title: 'other'
            }
          ]
          res.body.errors = undefined
        })
      }
    }).as('gqlMyAddressesQuery')
    cy.intercept('POST', 'http://localhost:4000/graphql', (req) => {
      if (req.body.operationName === 'Cities') {
        req.reply((res) => {
          res.body.data.cities = [
            'Ankara',
            'Istanbul',
            'Izmir'
          ]
        })
      }
    }).as('gqlCitiesQuery')

    cy.wait('@gqlMeQuery')
  })

  context('Modal Tests', () => {
    it('should close delete address dialog when close button clicked', () => {
      cy.wait('@gqlMyAddressesQuery')
      cy.contains('Please select an address').click()
      cy.wait('@gqlCitiesQuery');
      cy.get('[data-cy="delete-btn1"]').click()
      cy.get('[data-cy="dialog-close-btn"]').click()
      cy.contains('Delete Address').should('not.exist')
    })
  })

  context('Delete Address', () => {
    it('address should be deleted when delete button clicked', () => {
      cy.intercept('POST', 'http://localhost:4000/graphql', (req) => {
        if (req.body.operationName === 'DeleteAddress') {
          req.reply((res) => {
            res.body.data.deleteAddress = '1'
            res.body.errors = undefined
          })
        }
      }).as('gqlDeleteAddressMutation');

      cy.wait('@gqlMyAddressesQuery')
      cy.contains('Please select an address').click()
      cy.wait('@gqlCitiesQuery');
      cy.get('[data-cy="delete-btn1"]').click()
      cy.get('[data-cy="dialog-confirm-btn"]').click()
      cy.wait('@gqlDeleteAddressMutation');
      cy.contains('Delete Address').should('not.exist')
      cy.contains('p', 'Address to be deleted').should('not.exist')
    })
  })
})