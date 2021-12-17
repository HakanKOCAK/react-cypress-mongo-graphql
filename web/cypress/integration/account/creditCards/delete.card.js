/// <reference types="cypress" />

describe('Add Card Tests', () => {
  beforeEach(() => {
    //Go to account
    cy.visit('/account/credit-cards');

    //Assume there is an authenticated user
    cy.refreshToken();
    cy.gqlQuery({ type: 'me' });
    cy.gqlQuery({ type: 'myCreditCards', opts: { isEmpty: false } });
    cy.get('[data-cy="delete-card-1-btn"]').click();
  });

  it('should close delete card dialog when cancel clicked', () => {
    cy.contains('Cancel').click();
    cy.contains('Delete Credit Card').should('not.exist');
  });

  it('should delete card dialog when delete clicked', () => {
    cy.gqlMutation({ type: 'deleteCreditCard', variables: { id: '1' } })
    cy.contains('My Mastercard').should('be.visible');
    cy.get('[data-cy="dialog-confirm-btn"]').click();
    cy.contains('My Mastercard').should('not.exist');
  });
});