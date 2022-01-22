/// <reference types="cypress" />

describe('Delete Cart Item', () => {
  beforeEach(() => {
    //Assume there is an authenticated user
    cy.refreshToken();
    cy.gqlQuery({ type: 'me' });

    localStorage.setItem('fooder.last.address', JSON.stringify({
      id: '0',
      address: 'Home adress',
      city: 'Istanbul',
      county: 'Besiktas',
      district: 'Bebek',
      flat: 2,
      floor: 3,
      title: 'home'
    }));
    cy.gqlQuery({ type: 'myAddresses', opts: { isEmpty: false } });
    cy.gqlQuery({ type: 'restaurants', opts: { isEmpty: false } });
    cy.gqlQuery({ type: 'cart', opts: { isEmpty: false, type: 'hamburger' } });

    //Go to cart
    cy.visit('/cart');
  });

  it('should close delete dialog when close button clicked', () => {
    cy.get('[data-cy="cart-item-hamburger-delete-button"]').click();
    cy.get('[data-cy="dialog-close-btn"]').click();
    cy.contains('Delete').should('not.exist')
  });

  it('should delete cart item when delete button clicked', () => {
    cy.gqlMutation({ type: 'deleteCartItem', variables: { id: '0' } })
    cy.get('[data-cy="cart-item-hamburger-delete-button"]').click();
    cy.get('[data-cy="dialog-confirm-btn"]').click()
    cy.gqlQuery({ type: 'cart', opts: { isEmpty: true } });
    cy.contains('There are no items in the cart.').should('be.visible');
  });
});