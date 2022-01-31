/// <reference types="cypress" />

describe('Delete Cart Item', () => {
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

  it('should close food modal dialog when close button clicked', () => {
    cy.get('[data-cy="cart-item-hamburger-edit-button"]').click();
    cy.get('[data-cy="food-modal-close-button"]').click();
    cy.contains('Update').should('not.exist');
  });

  it('should update cart item when update button clicked', () => {
    cy.get('[data-cy="cart-item-hamburger-edit-button"]').click();
    cy.get('[data-cy="food-modal-increase-quantity"]').click();
    cy.get('[data-cy="food-modal-add-to-cart-button"]').click();
    cy.contains('$16.00').should('be.visible');
    cy.contains('2 Hamburger').should('be.visible');
  });
});