/// <reference types="cypress" />

describe('Cart List', () => {
  beforeEach(() => {
    //Assume there is an authenticated user
    cy.refreshToken();
    cy.gqlQuery({ type: 'me' });

    //Go to cart
    cy.visit('/cart');
  });

  it('should redirect to /login when authenticated user is not exists', () => {
    //Assume there is no authenticated user
    cy.intercept('http://localhost:4000/refresh_token', {
      body: { accessToken: '' }
    }).as('refreshToken');

    cy.intercept('POST', 'http://localhost:4000/graphql', {
      body: {
        data: {
          me: null
        }
      }
    }).as('gqlMeQuery');

    cy.url().should('include', '/login')
  });

  it('should display there are no items in the cart text when cart is empty', () => {
    cy.gqlQuery({ type: 'myAddresses', opts: { isEmpty: false } });
    cy.gqlQuery({ type: 'restaurants', opts: { isEmpty: true } });
    cy.gqlQuery({ type: 'cart', opts: { isEmpty: true } });

    cy.contains('There are no items in the cart.').should('be.visible');
  });

  it('should display restaurant and cart details when cart is not empty', () => {
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
    cy.contains('Hamburger Test Restaurant').should('be.visible');
    cy.contains('1 Hamburger').should('be.visible');
    cy.contains('Checkout: $8.00').should('be.visible');
  });

  it('should redirect to restaurant menu when clicked on restaurant link', () => {
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
    cy.gqlQuery({ type: 'menu', opts: { hamburger: true } });
    cy.contains('Hamburger Test Restaurant').click();
    cy.url().should('include', '/restaurants/1')
  });

  it('should open delete dialog when delete button clicked', () => {
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
    cy.get('[data-cy="cart-item-hamburger-delete-button"]').click();
    cy.get('[data-cy="dialog-confirm-btn"]').should('be.visible');
  });

  it('should open food modal dialog when edit button clicked', () => {
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
    cy.get('[data-cy="cart-item-hamburger-edit-button"]').click();
    cy.contains('Update').should('be.visible');
  });
});
