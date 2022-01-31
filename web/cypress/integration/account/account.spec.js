/// <reference types="cypress" />

describe('Account tests', () => {
  before(() => {
    //Go to account
    cy.visit('/account');
  });

  it('should redirect to /login when authenticated user is not exists', () => {
    cy.url().should('include', '/login');
  });

  context('Authenticated User', () => {
    before(() => {
      //Login user
      cy.visit('/login');
      cy.get('[data-cy="email-input"]').type('testaccount@test.com');
      cy.get('[data-cy="password-input"]').type('123456');
      cy.get('[data-cy="login-button"]').click();
      //Go to account
      cy.visit('/account');
    });

    it('should redirect to /account/addresses when my addresses clicked', () => {
      cy.get('[data-cy="myAddresses-btn"]').click().should('have.css', 'background-color', 'rgb(178, 245, 234)');
      cy.url().should('contain', '/addresses');
    });

    it('should redirect to /account/credit-cards when my cards clicked', () => {
      cy.get('[data-cy="myCards-btn"]').click().should('have.css', 'background-color', 'rgb(178, 245, 234)');
      cy.url().should('contain', '/credit-cards');
    });

    it('should redirect to /account/orders when my orders clicked', () => {
      cy.get('[data-cy="myOrders-btn"]').click().should('have.css', 'background-color', 'rgb(178, 245, 234)');
      cy.url().should('contain', '/orders');
    });
  });
});
