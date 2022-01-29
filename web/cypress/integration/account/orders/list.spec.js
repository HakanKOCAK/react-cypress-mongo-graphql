/// <reference types="cypress" />

describe('My Orders Tests', () => {
  beforeEach(() => {
    //Go to account
    cy.visit('/account/orders');

    //Assume there is an authenticated user
    cy.refreshToken();
    cy.gqlQuery({ type: 'me' });
  });

  it('should display you dont have any order when user does not have an order', () => {
    cy.gqlQuery({ type: 'myOrders', opts: { isEmpty: true } });
    cy.contains('You don\'t have any orders').should('be.visible');
  });

  it('should display order(s) when user have order(s)', () => {
    cy.gqlQuery({ type: 'myOrders', opts: { isEmpty: false } });
    cy.contains('You don\'t have any orders').should('not.exist');
  });

  it('should open order details modal when an order clicked', () => {
    cy.gqlQuery({ type: 'myOrders', opts: { isEmpty: false } });
    cy.contains('Hamburger Test Restaurant').click();
    cy.contains('Order Details').should('be.visible');
  });

});
