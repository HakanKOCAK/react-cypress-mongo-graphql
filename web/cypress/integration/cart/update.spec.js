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


  it('should close food modal dialog when close button clicked', () => {
    cy.get('[data-cy="cart-item-hamburger-edit-button"]').click();
    cy.get('[data-cy="food-modal-close-button"]').click();
    cy.contains('Update').should('not.exist');
  });

  it('should update cart item when update button clicked', () => {
    const variables = {
      id: '0',
      drinkType: null,
      falafelPieces: null,
      itemType: 'hamburger',
      name: 'hamburger',
      optionals: {
        basil: null,
        greenPeppers: null,
        ham: null,
        ketchup: true,
        lettuce: null,
        mayonnaise: null,
        mushrooms: null,
        mustard: true,
        onions: null,
        pickles: true,
        redOnion: null,
        sweetCorn: null,
        tomatoes: null,
        '__typename': "Optionals"
      },
      pizzaSizeOption: null,
      price: 16,
      quantity: 2,
      selectedMealDetails: {
        mealPrice: 0,
        name: '',
        size: '',
        totalPrice: 0,
        '__typename': "SelectedMealDetails"
      },
      sideSizeOption: null,
      sweetType: null,
      totalPrice: 8
    };

    cy.gqlMutation({ type: 'updateCartItem', variables });
    cy.get('[data-cy="cart-item-hamburger-edit-button"]').click();
    cy.get('[data-cy="food-modal-add-to-cart-button"]').click();
    cy.gqlQuery({ type: 'cart', opts: { isEmpty: false, type: 'hamburger', updated: true } });
    cy.contains('$16.00').should('be.visible');
    cy.contains('2 Hamburger').should('be.visible');
  });
});