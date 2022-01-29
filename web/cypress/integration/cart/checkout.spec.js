/// <reference types="cypress" />

describe('Cart Checkout Tests', () => {
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


  it('checkout button should be disabled when cart amount is lower than minimum amount', () => {
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
    cy.contains('Checkout: $8.00').should('be.disabled');
  });

  it('checkout button should be enabled when cart amount is higher than minimum amount', () => {
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
    cy.gqlQuery({ type: 'cart', opts: { isEmpty: false, type: 'pizza' } });
    cy.contains('Checkout: $27.00').should('not.be.disabled');
  });

  it('checkout modal should be displayed when checkout is clicked', () => {
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
    cy.gqlQuery({ type: 'cart', opts: { isEmpty: false, type: 'pizza' } });
    cy.get('[data-cy="cart-checkout-btn"]').click();
    cy.contains('header', 'Checkout').should('be.visible')
  });

  it('modal checkout button should be disabled when a payment method is not selected', () => {
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
    cy.gqlQuery({ type: 'cart', opts: { isEmpty: false, type: 'pizza' } });
    cy.get('[data-cy="cart-checkout-btn"]').click();
    cy.get('[data-cy="modal-checkout-btn"]').should('be.disabled')
  });

  it('modal checkout button should be enabled when a payment method is selected', () => {
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
    cy.gqlQuery({ type: 'cart', opts: { isEmpty: false, type: 'pizza' } });
    cy.get('[data-cy="cart-checkout-btn"]').click();
    cy.contains('Cash').click();
    cy.get('[data-cy="modal-checkout-btn"]').should('be.enabled')
  });

  it('modal checkout button should be disabled when payment method is online but a credit card is not selected', () => {
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
    cy.gqlQuery({ type: 'myCreditCards', opts: { isEmpty: false } });
    cy.gqlQuery({ type: 'cart', opts: { isEmpty: false, type: 'pizza' } });
    cy.get('[data-cy="cart-checkout-btn"]').click();
    cy.contains('Online').click();
    cy.get('[data-cy="modal-checkout-btn"]').should('be.disabled')
  });

  it('credit card modal should be opened when select a credit card button clicked', () => {
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
    cy.gqlQuery({ type: 'myCreditCards', opts: { isEmpty: false } });
    cy.gqlQuery({ type: 'cart', opts: { isEmpty: false, type: 'pizza' } });
    cy.get('[data-cy="cart-checkout-btn"]').click();
    cy.contains('Online').click();
    cy.contains('Select a credit card').click();
    cy.contains('My Cards').should('be.visible');
  });

  it('modal checkout button should be disabled when payment is online but credit card is not selected', () => {
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
    cy.gqlQuery({ type: 'myCreditCards', opts: { isEmpty: false } });
    cy.gqlQuery({ type: 'cart', opts: { isEmpty: false, type: 'pizza' } });
    cy.get('[data-cy="cart-checkout-btn"]').click();
    cy.contains('Online').click();
    cy.contains('Select a credit card').click();
    cy.contains('My Visa Card').click();
    cy.get('[data-cy="modal-checkout-btn"]').should('be.enabled')
  });

  it('should redirect to orders page when checkout is clicked', () => {
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

    const order = {
      createdAt: new Date().toISOString(),
      creditCard: '************1111',
      deliveryAddress: {
        address: 'Home adress',
        city: 'Istanbul',
        county: 'Besiktas',
        district: 'Bebek',
        flat: 2,
        floor: 3,
        __typename: "Address"
      },
      items: [
        {
          drinkType: null,
          falafelPieces: null,
          id: '0',
          item: null,
          optionals: {
            basil: null,
            greenPeppers: true,
            ham: null,
            ketchup: null,
            lettuce: null,
            mayonnaise: null,
            mushrooms: true,
            mustard: null,
            onions: null,
            pickles: null,
            redOnion: null,
            sweetCorn: true,
            tomatoes: null,
            __typename: 'Optionals'
          },
          pizzaSizeOption: 'small',
          price: null,
          quantity: 3,
          selectedMealDetails: {
            mealPrice: null,
            name: null,
            size: null,
            totalPrice: null,
            __typename: 'SelectedMealDetails'
          },
          sideSizeOption: null,
          sweetType: null,
          totalPrice: 27,
          __typename: 'CartItem',
        }
      ],
      restaurantDetails: {
        city: "Istanbul",
        county: "Besiktas",
        name: 'Pizza Test Restaurant',
        __typename: 'Restaurant'
      },
      total: 27,
      __typename: 'Order'
    }

    cy.gqlQuery({ type: 'myAddresses', opts: { isEmpty: false } });
    cy.gqlQuery({ type: 'restaurants', opts: { isEmpty: false } });
    cy.gqlQuery({ type: 'myOrders', opts: { isEmpty: true, added: order } });
    cy.gqlQuery({ type: 'myCreditCards', opts: { isEmpty: false } });
    cy.gqlQuery({ type: 'cart', opts: { isEmpty: false, type: 'pizza' } });
    cy.gqlMutation({ type: 'order', variables: order })
    cy.get('[data-cy="cart-checkout-btn"]').click();
    cy.contains('Online').click();
    cy.contains('Select a credit card').click();
    cy.contains('My Visa Card').click();
    cy.get('[data-cy="modal-checkout-btn"]').click();
    cy.gqlMutation({ type: 'emptyCart' });
    cy.gqlQuery({ type: 'cart', opts: { isEmpty: true } });
    cy.url().should('include', '/orders');
    cy.contains('Pizza Test Restaurant').should('be.visible');
  });

});
