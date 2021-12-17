/// <reference types="cypress" />

describe('My Cards Tests', () => {
  beforeEach(() => {
    //Go to account
    cy.visit('/account/credit-cards');

    //Assume there is an authenticated user
    cy.refreshToken();
    cy.gqlQuery({ type: 'me' });
  });

  it('should display you dont have any cards when user does not have a saved card', () => {
    cy.gqlQuery({ type: 'myCreditCards', opts: { isEmpty: true } });
    cy.contains('You don\'t have any cards').should('be.visible');
  });

  it('should display card(s) when user have saved card(s)', () => {
    cy.gqlQuery({ type: 'myCreditCards', opts: { isEmpty: false } });
    cy.contains('You don\'t have any cards').should('not.exist');
  });

  it('should open new card modal when add a credit card clicked', () => {
    cy.gqlQuery({ type: 'myCreditCards', opts: { isEmpty: false } });
    cy.contains('Add a credit card').click();
    cy.contains('New Card').should('be.visible');
  });

  it('should open delete credit modal when delete-btn clicked', () => {
    cy.gqlQuery({ type: 'myCreditCards', opts: { isEmpty: false } });
    cy.get('[data-cy="delete-card-0-btn"]').click('');
    cy.contains('Delete Credit Card').should('be.visible');
  });
})