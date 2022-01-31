/// <reference types="cypress" />

describe('Add Card Tests', () => {
  before(() => {
    //Login user
    cy.visit('/login');
    cy.get('[data-cy="email-input"]').type('testaccount@test.com');
    cy.get('[data-cy="password-input"]').type('123456');
    cy.get('[data-cy="login-button"]').click();

    //Go to account
    cy.visit('/account/credit-cards');
  });

  it('should close delete card dialog when cancel clicked', () => {
    cy.get('[data-cy="delete-card-My-Visa-Card-btn"]').click();
    cy.contains('Cancel').click();
    cy.contains('Delete Credit Card').should('not.exist');
  });

  it('should delete card dialog when delete clicked', () => {
    cy.contains('Add a credit card').click();

    //Create a credit card to be deleted
    const variables = {
      description: 'Card to be deleted',
      number: '343333333333333',
      holder: 'Hakan Kocak',
      expiry: '12/34',
      cvc: '1234',
      issuer: 'amex'
    }
    cy.get('[data-cy="description-input"]').type(variables.description);
    cy.get('[data-cy="number-input"]').type(variables.number);
    cy.get('[data-cy="holder-input"]').type(variables.holder);
    cy.get('[data-cy="expiry-input"]').type(variables.expiry.split('/').join(''));
    cy.get('[data-cy="cvc-input"]').type(variables.cvc);
    cy.get('[data-cy="save-card-btn"]').click();
    cy.contains('New Card').should('not.exist');
    cy.contains('Card to be deleted').should('be.visible');

    cy.get('[data-cy="delete-card-Card-to-be-deleted-btn"]').click();
    cy.get('[data-cy="dialog-confirm-btn"]').click();
    cy.contains('Card to be deleted').should('not.exist');
  });
});