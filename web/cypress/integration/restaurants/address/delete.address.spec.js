/// <reference types="cypress" />

describe('Delete Address', () => {
  before(() => {
    //Login user
    cy.visit('/login');
    cy.get('[data-cy="email-input"]').type('testaccount@test.com');
    cy.get('[data-cy="password-input"]').type('123456');
    cy.get('[data-cy="login-button"]').click();
  });

  context('Modal Tests', () => {
    it('should close delete address dialog when close button clicked', () => {
      cy.contains('Please select an address').click()
      cy.get('[data-cy="delete-btn-Other-address"]').click()
      cy.get('[data-cy="dialog-close-btn"]').click()
      cy.contains('Delete Address').should('not.exist')
    })
  })

  context('Delete Address', () => {
    it('address should be deleted when delete button clicked', () => {
      //Create new address to be deleted
      cy.contains('Add an address').click();
      cy.get('[data-cy="title-select"]').select('Home');
      cy.get('[data-cy="city-select"]').select('Istanbul');
      cy.get('[data-cy="county-select"]').select('Besiktas');
      cy.get('[data-cy="district-select"]').select('Levent');
      cy.get('[data-cy="address-input"]').type('Address to be deleted');
      cy.get('[data-cy="floor-input"]').type('1');
      cy.get('[data-cy="flat-input"]').type('3');
      cy.get('[data-cy="new-address-save-btn"]').click();
      cy.contains('Add an address').should('be.visible');
      cy.contains('p', 'Address to be deleted').should('be.visible');

      cy.get('[data-cy="delete-btn-Address-to-be-deleted"]').click();
      cy.get('[data-cy="dialog-confirm-btn"]').click();
      cy.contains('Delete Address').should('not.exist');
      cy.contains('p', 'Address to be deleted').should('not.exist');
    })
  })
})