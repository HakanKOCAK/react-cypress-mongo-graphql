/// <reference types="cypress" />

describe('My Orders Tests', () => {
  beforeEach(() => {
    //Login user
    cy.visit('/login');
    cy.get('[data-cy="email-input"]').type('testaccount@test.com');
    cy.get('[data-cy="password-input"]').type('123456');
    cy.get('[data-cy="login-button"]').click();


    //Go to account
    cy.visit('/account/orders');
  });

  it('should display you dont have any order when user does not have an order', () => {
    cy.gqlQuery({ type: 'myOrders', opts: { isEmpty: true } });
    cy.contains('You don\'t have any orders').should('be.visible');
  });

  it('should display order(s) when user have order(s)', () => {
    cy.contains('You don\'t have any orders').should('not.exist');
  });

  it('should open order details modal when an order clicked', () => {
    cy.contains('Hamburger Test Restaurant').click();
    cy.contains('Order Details').should('be.visible');
  });

});
