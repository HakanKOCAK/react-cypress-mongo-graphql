/// <reference types="cypress" />

describe('Cart List', () => {
  it('should redirect to /login when authenticated user is not exists', () => {
    //Go to cart
    cy.visit('/cart');
    cy.url().should('include', '/login')
  });

  context('Authenticated User', () => {
    before(() => {
      //Login user
      cy.visit('/login');
      cy.get('[data-cy="email-input"]').type('testaccount@test.com');
      cy.get('[data-cy="password-input"]').type('123456');
      cy.get('[data-cy="login-button"]').click();

      //Go to cart
      cy.visit('/cart');
    });

    it('should display there are no items in the cart text when cart is empty', () => {
      cy.contains('There are no items in the cart.').should('be.visible');
    });

    it('should display restaurant and cart details when cart is not empty', () => {
      cy.contains('Restaurants').click();
      cy.contains('Please select an address').click();
      cy.contains('Home address').click();
      cy.contains('Hamburger Test Restaurant').click();
      cy.get('[data-cy="menu-item-hamburger"]').click();
      cy.get('[data-cy="food-modal-add-to-cart-button"]').click();
      cy.wait(1000);
      cy.get('[data-cy="navbar-cart-button"]').click();
      cy.contains('1 Hamburger').should('be.visible');
      cy.contains('Checkout: $8.00').should('be.visible');
    });

    it('should redirect to restaurant menu when clicked on restaurant link', () => {
      cy.contains('Hamburger Test Restaurant').click();
      cy.url().should('include', '/restaurants/')
    });

    it('should open delete dialog when delete button clicked', () => {
      cy.get('[data-cy="navbar-cart-button"]').click();
      cy.get('[data-cy="cart-item-hamburger-delete-button"]').click();
      cy.get('[data-cy="dialog-confirm-btn"]').should('be.visible');
    });

    it('should open food modal dialog when edit button clicked', () => {
      cy.get('[data-cy="dialog-close-btn"]').click();
      cy.get('[data-cy="cart-item-hamburger-edit-button"]').click();
      cy.contains('Update').should('be.visible');
    });
  });
});
