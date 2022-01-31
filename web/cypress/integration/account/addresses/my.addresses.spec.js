/// <reference types="cypress" />

describe('My Addresses Tests', () => {
  beforeEach(() => {
    //Login user
    cy.visit('/login');
    cy.get('[data-cy="email-input"]').type('testaccount@test.com');
    cy.get('[data-cy="password-input"]').type('123456');
    cy.get('[data-cy="login-button"]').click();

    //Go to account
    cy.visit('/account/addresses');
  });

  it('should display you dont have any address when user does not have a saved address', () => {
    cy.gqlQuery({ type: 'myAddresses', opts: { isEmpty: true } });
    cy.contains('You don\'t have any address').should('be.visible');
  });

  it('should display address(es) when user does have saved address(es)', () => {
    cy.contains('You don\'t have any address').should('not.exist');
  });

  it('should open new address dialog when click on Add an address', () => {
    cy.contains('Add an address').click();
    cy.contains('New Address').should('be.visible');
  });

  context('Remained address tests could be found under /restaurants/address check out the spec files', () => null)

})