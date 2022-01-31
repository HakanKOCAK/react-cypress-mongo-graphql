/// <reference types="cypress" />

describe('Cart Checkout Tests', () => {
  before(() => {
    //Login user
    cy.visit('/login');
    cy.get('[data-cy="email-input"]').type('testaccount@test.com');
    cy.get('[data-cy="password-input"]').type('123456');
    cy.get('[data-cy="login-button"]').click();

    //Set address
    cy.contains('Please select an address').click();
    cy.contains('Home address').click();

    //Go to restaurant page
    cy.contains('Hamburger Test Restaurant').click();
    cy.get('[data-cy="menu-item-hamburger"]').click();
    cy.get('[data-cy="food-modal-add-to-cart-button"]').click();
    cy.wait(1000);
    cy.get('[data-cy="navbar-cart-button"]').click();
  });

  it('checkout button should be disabled when cart amount is lower than minimum amount', () => {
    cy.contains('Checkout: $8.00').should('be.disabled');
  });

  it('checkout button should be enabled when cart amount is higher than minimum amount', () => {
    cy.get('[data-cy="cart-item-hamburger-edit-button"]').click();
    cy.get('[data-cy="food-modal-increase-quantity"]').click();
    cy.get('[data-cy="food-modal-increase-quantity"]').click();
    cy.get('[data-cy="food-modal-add-to-cart-button"]').click();
    cy.contains('Checkout: $24.00').should('not.be.disabled');
  });

  it('checkout modal should be displayed when checkout is clicked', () => {
    cy.get('[data-cy="cart-checkout-btn"]').click();
    cy.contains('header', 'Checkout').should('be.visible')
  });

  it('modal checkout button should be disabled when a payment method is not selected', () => {
    cy.get('[data-cy="modal-checkout-btn"]').should('be.disabled')
  });

  it('modal checkout button should be enabled when a payment method is selected', () => {
    cy.contains('Cash').click();
    cy.get('[data-cy="modal-checkout-btn"]').should('be.enabled')
  });

  it('modal checkout button should be disabled when payment method is online but a credit card is not selected', () => {
    cy.contains('Online').click();
    cy.get('[data-cy="modal-checkout-btn"]').should('be.disabled')
  });

  it('credit card modal should be opened when select a credit card button clicked', () => {
    cy.contains('Select a credit card').click();
    cy.contains('My Cards').should('be.visible');
  });

  it('modal checkout button should be enabled when payment is online and credit card is selected', () => {
    cy.contains('My Visa Card').click();
    cy.get('[data-cy="modal-checkout-btn"]').should('be.enabled')
  });

  it('should redirect to orders page when checkout is clicked', () => {
    cy.get('[data-cy="modal-checkout-btn"]').click();
    cy.url().should('include', '/orders');
  });
});
