/// <reference types="cypress" />

describe('Delete Address', () => {
  beforeEach(() => {
    //Go to restaurants
    cy.visit('/restaurants');

    //Assume there is an authenticated user
    cy.refreshToken();
    cy.gqlQuery({ type: 'me' })
  })

  context('Modal Tests', () => {
    it('should close delete address dialog when close button clicked', () => {
      cy.gqlQuery({ type: 'myAddresses', opts: { isEmpty: false } })
      cy.contains('Please select an address').click()
      cy.gqlQuery({ type: 'cities' })
      cy.get('[data-cy="delete-btn1"]').click()
      cy.get('[data-cy="dialog-close-btn"]').click()
      cy.contains('Delete Address').should('not.exist')
    })
  })

  context('Delete Address', () => {
    it('address should be deleted when delete button clicked', () => {
      cy.gqlMutation({ type: 'deleteAddress', variables: { id: '1' } })

      cy.gqlQuery({ type: 'myAddresses', opts: { isEmpty: false } })
      cy.contains('Please select an address').click()
      cy.gqlQuery({ type: 'cities' })
      cy.get('[data-cy="delete-btn1"]').click()
      cy.get('[data-cy="dialog-confirm-btn"]').click()
      cy.contains('Delete Address').should('not.exist')
      cy.contains('p', 'Address to be deleted').should('not.exist')
    })
  })
})