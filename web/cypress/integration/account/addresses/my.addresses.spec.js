/// <reference types="cypress" />

describe('My Addresses Tests', () => {
  beforeEach(() => {
    //Go to account
    cy.visit('/account/addresses');

    //Assume there is an authenticated user
    cy.refreshToken();
    cy.gqlQuery({ type: 'me' });
  });

  it('should display you dont have any address when user does not have a saved address', () => {
    cy.gqlQuery({ type: 'myAddresses', opts: { isEmpty: true } });
    cy.contains('You don\'t have any address').should('be.visible');
  });

  it('should display address(es) when user does have saved address(es)', () => {
    cy.gqlQuery({ type: 'myAddresses', opts: { isEmpty: false } });
    cy.contains('You don\'t have any address').should('not.exist');
  });

  it('should open new address dialog when click on Add an address', () => {
    cy.gqlQuery({ type: 'myAddresses', opts: { isEmpty: false } });
    cy.contains('Add an address').click();
    cy.contains('New Address').should('be.visible');
  });


  context('Remained address tests could be found under /home/address check out the spec files', () => null)

})