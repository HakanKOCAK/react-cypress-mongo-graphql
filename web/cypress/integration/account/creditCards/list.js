/// <reference types="cypress" />

describe('My Cards Tests', () => {
  beforeEach(() => {
    //Login user
    cy.visit('/login');
    cy.get('[data-cy="email-input"]').type('testaccount@test.com');
    cy.get('[data-cy="password-input"]').type('123456');
    cy.get('[data-cy="login-button"]').click();

    //Go to account
    cy.visit('/account/credit-cards');
  });

  it('should display you dont have any cards when user does not have a saved card', () => {
    cy.gqlQuery({ type: 'myCreditCards', opts: { isEmpty: true } });
    cy.contains('You don\'t have any cards').should('be.visible');
  });

  it('should display card(s) when user have saved card(s)', () => {
    cy.contains('You don\'t have any cards').should('not.exist');
  });

  it('should open new card modal when add a credit card clicked', () => {
    cy.contains('Add a credit card').click();
    cy.contains('New Card').should('be.visible');
  });

  it('should open delete credit modal when delete-btn clicked', () => {
    cy.get('[data-cy="delete-card-My-Visa-Card-btn"]').click('');
    cy.contains('Delete Credit Card').should('be.visible');
  });
})