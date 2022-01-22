/// <reference types="cypress" />

describe('Restaurant Menu', () => {
  beforeEach(() => {
    //Assume there is an authenticated user
    cy.refreshToken();
    cy.gqlQuery({ type: 'me' });

    //Go to restaurants
    cy.visit('/restaurants');
  });

  // it('should redirect to /login when authenticated user is not exists', () => {
  //   //Assume there is no authenticated user
  //   cy.intercept('http://localhost:4000/refresh_token', {
  //     body: { accessToken: '' }
  //   }).as('refreshToken');

  //   cy.intercept('POST', 'http://localhost:4000/graphql', {
  //     body: {
  //       data: {
  //         me: null
  //       }
  //     }
  //   }).as('gqlMeQuery');

  //   cy.url().should('include', '/login')
  // });

  // it('should open food modal when an item clicked', () => {
  //   localStorage.setItem('fooder.last.address', JSON.stringify({
  //     id: '0',
  //     address: 'Home adress',
  //     city: 'Istanbul',
  //     county: 'Besiktas',
  //     district: 'Bebek',
  //     flat: 2,
  //     floor: 3,
  //     title: 'home'
  //   }));
  //   cy.gqlQuery({ type: 'myAddresses', opts: { isEmpty: false } });
  //   cy.gqlQuery({ type: 'restaurants', opts: { isEmpty: false } });
  //   cy.gqlQuery({ type: 'cart', opts: { isEmpty: true } });
  //   cy.gqlQuery({ type: 'menu', opts: { pizza: true } });
  //   cy.contains('Pizza Test Restaurant').click();
  //   cy.get('[data-cy="menu-item-margherita"]').click();
  //   cy.contains('Add to Cart').should('be.visible');
  // });

  // it('should close food modal when close button clicked', () => {
  //   localStorage.setItem('fooder.last.address', JSON.stringify({
  //     id: '0',
  //     address: 'Home adress',
  //     city: 'Istanbul',
  //     county: 'Besiktas',
  //     district: 'Bebek',
  //     flat: 2,
  //     floor: 3,
  //     title: 'home'
  //   }));
  //   cy.gqlQuery({ type: 'myAddresses', opts: { isEmpty: false } });
  //   cy.gqlQuery({ type: 'restaurants', opts: { isEmpty: false } });
  //   cy.gqlQuery({ type: 'cart', opts: { isEmpty: true } });
  //   cy.gqlQuery({ type: 'menu', opts: { pizza: true } });
  //   cy.contains('Pizza Test Restaurant').click();
  //   cy.get('[data-cy="menu-item-margherita"]').click();
  //   cy.get('[data-cy="food-modal-close-button"]').click();
  //   cy.contains('Add to Cart').should('not.exist');
  // });

  // it('add to cart button should be disabled when type is not selected', () => {
  //   localStorage.setItem('fooder.last.address', JSON.stringify({
  //     id: '0',
  //     address: 'Home adress',
  //     city: 'Istanbul',
  //     county: 'Besiktas',
  //     district: 'Bebek',
  //     flat: 2,
  //     floor: 3,
  //     title: 'home'
  //   }));
  //   cy.gqlQuery({ type: 'myAddresses', opts: { isEmpty: false } });
  //   cy.gqlQuery({ type: 'restaurants', opts: { isEmpty: false } });
  //   cy.gqlQuery({ type: 'cart', opts: { isEmpty: true } });
  //   cy.gqlQuery({ type: 'menu', opts: { pizza: true } });
  //   cy.contains('Pizza Test Restaurant').click();
  //   cy.get('[data-cy="menu-item-coke"]').click();
  //   cy.get('[data-cy="food-modal-add-to-cart-button"]').should('be.disabled');
  // });

  // it('add to cart button should be enabled when type is selected', () => {
  //   localStorage.setItem('fooder.last.address', JSON.stringify({
  //     id: '0',
  //     address: 'Home adress',
  //     city: 'Istanbul',
  //     county: 'Besiktas',
  //     district: 'Bebek',
  //     flat: 2,
  //     floor: 3,
  //     title: 'home'
  //   }));
  //   cy.gqlQuery({ type: 'myAddresses', opts: { isEmpty: false } });
  //   cy.gqlQuery({ type: 'restaurants', opts: { isEmpty: false } });
  //   cy.gqlQuery({ type: 'cart', opts: { isEmpty: true } });
  //   cy.gqlQuery({ type: 'menu', opts: { pizza: true } });
  //   cy.contains('Pizza Test Restaurant').click();
  //   cy.get('[data-cy="menu-item-coke"]').click();
  //   cy.contains('Zero').click();
  //   cy.get('[data-cy="food-modal-add-to-cart-button"]').should('be.enabled');
  // });

  // it('total price should change when medium is selected', () => {
  //   localStorage.setItem('fooder.last.address', JSON.stringify({
  //     id: '0',
  //     address: 'Home adress',
  //     city: 'Istanbul',
  //     county: 'Besiktas',
  //     district: 'Bebek',
  //     flat: 2,
  //     floor: 3,
  //     title: 'home'
  //   }));
  //   cy.gqlQuery({ type: 'myAddresses', opts: { isEmpty: false } });
  //   cy.gqlQuery({ type: 'restaurants', opts: { isEmpty: false } });
  //   cy.gqlQuery({ type: 'cart', opts: { isEmpty: true } });
  //   cy.gqlQuery({ type: 'menu', opts: { pizza: true } });
  //   cy.contains('Pizza Test Restaurant').click();
  //   cy.get('[data-cy="menu-item-margherita"]').click();
  //   cy.get('[data-cy="food-modal-total"]').invoke('text').then((text1) => {
  //     cy.contains('Medium').click();
  //     cy.get('[data-cy="food-modal-total"]').invoke('text').should((text2) => {
  //       expect(text1).not.to.eq(text2);
  //     })
  //   })
  // });

  // it('total price should change when a meal is selected', () => {
  //   localStorage.setItem('fooder.last.address', JSON.stringify({
  //     id: '0',
  //     address: 'Home adress',
  //     city: 'Istanbul',
  //     county: 'Besiktas',
  //     district: 'Bebek',
  //     flat: 2,
  //     floor: 3,
  //     title: 'home'
  //   }));
  //   cy.gqlQuery({ type: 'myAddresses', opts: { isEmpty: false } });
  //   cy.gqlQuery({ type: 'restaurants', opts: { isEmpty: false } });
  //   cy.gqlQuery({ type: 'cart', opts: { isEmpty: true } });
  //   cy.gqlQuery({ type: 'menu', opts: { hamburger: true } });
  //   cy.contains('Hamburger Test Restaurant').click();
  //   cy.get('[data-cy="menu-item-hamburger"]').click();
  //   cy.get('[data-cy="food-modal-total"]').invoke('text').then((text1) => {
  //     cy.contains('Medium').click();
  //     cy.get('[data-cy="food-modal-total"]').invoke('text').should((text2) => {
  //       expect(text1).not.to.eq(text2);
  //     })
  //   })
  // });

  // it('decrease quantity should be disabled when quantity is 1', () => {
  //   localStorage.setItem('fooder.last.address', JSON.stringify({
  //     id: '0',
  //     address: 'Home adress',
  //     city: 'Istanbul',
  //     county: 'Besiktas',
  //     district: 'Bebek',
  //     flat: 2,
  //     floor: 3,
  //     title: 'home'
  //   }));
  //   cy.gqlQuery({ type: 'myAddresses', opts: { isEmpty: false } });
  //   cy.gqlQuery({ type: 'restaurants', opts: { isEmpty: false } });
  //   cy.gqlQuery({ type: 'cart', opts: { isEmpty: true } });
  //   cy.gqlQuery({ type: 'menu', opts: { hamburger: true } });
  //   cy.contains('Hamburger Test Restaurant').click();
  //   cy.get('[data-cy="menu-item-hamburger"]').click();
  //   cy.get('[data-cy="food-modal-decrease-quantity"]').should('be.disabled');
  // });

  // it('decrease quantity should be enabled when quantity higher than 1', () => {
  //   localStorage.setItem('fooder.last.address', JSON.stringify({
  //     id: '0',
  //     address: 'Home adress',
  //     city: 'Istanbul',
  //     county: 'Besiktas',
  //     district: 'Bebek',
  //     flat: 2,
  //     floor: 3,
  //     title: 'home'
  //   }));
  //   cy.gqlQuery({ type: 'myAddresses', opts: { isEmpty: false } });
  //   cy.gqlQuery({ type: 'restaurants', opts: { isEmpty: false } });
  //   cy.gqlQuery({ type: 'cart', opts: { isEmpty: true } });
  //   cy.gqlQuery({ type: 'menu', opts: { hamburger: true } });
  //   cy.contains('Hamburger Test Restaurant').click();
  //   cy.get('[data-cy="menu-item-hamburger"]').click();
  //   cy.get('[data-cy="food-modal-decrease-quantity"]').should('be.disabled');
  //   cy.get('[data-cy="food-modal-increase-quantity"]').click();
  //   cy.get('[data-cy="food-modal-decrease-quantity"]').should('be.enabled');
  // });


  // it('total price should change when quantity changes', () => {
  //   localStorage.setItem('fooder.last.address', JSON.stringify({
  //     id: '0',
  //     address: 'Home adress',
  //     city: 'Istanbul',
  //     county: 'Besiktas',
  //     district: 'Bebek',
  //     flat: 2,
  //     floor: 3,
  //     title: 'home'
  //   }));
  //   cy.gqlQuery({ type: 'myAddresses', opts: { isEmpty: false } });
  //   cy.gqlQuery({ type: 'restaurants', opts: { isEmpty: false } });
  //   cy.gqlQuery({ type: 'cart', opts: { isEmpty: true } });
  //   cy.gqlQuery({ type: 'menu', opts: { hamburger: true } });
  //   cy.contains('Hamburger Test Restaurant').click();
  //   cy.get('[data-cy="menu-item-hamburger"]').click();
  //   cy.get('[data-cy="food-modal-total"]').invoke('text').then((text1) => {
  //     cy.get('[data-cy="food-modal-increase-quantity"]').click();
  //     cy.get('[data-cy="food-modal-total"]').invoke('text').should((text2) => {
  //       expect(text1).not.to.eq(text2);
  //     })
  //   })
  // });

  // it('optional item should become not selected when its selected and clicked', () => {
  //   localStorage.setItem('fooder.last.address', JSON.stringify({
  //     id: '0',
  //     address: 'Home adress',
  //     city: 'Istanbul',
  //     county: 'Besiktas',
  //     district: 'Bebek',
  //     flat: 2,
  //     floor: 3,
  //     title: 'home'
  //   }));
  //   cy.gqlQuery({ type: 'myAddresses', opts: { isEmpty: false } });
  //   cy.gqlQuery({ type: 'restaurants', opts: { isEmpty: false } });
  //   cy.gqlQuery({ type: 'cart', opts: { isEmpty: true } });
  //   cy.gqlQuery({ type: 'menu', opts: { hamburger: true } });
  //   cy.contains('Hamburger Test Restaurant').click();
  //   cy.get('[data-cy="menu-item-hamburger"]').click();
  //   cy.get('[data-cy="food-modal-checkbox-pickles"]').children('input').uncheck({ force: true }).should('not.be.checked');
  // });

  // it('optional item should become selected when its not selected and clicked', () => {
  //   localStorage.setItem('fooder.last.address', JSON.stringify({
  //     id: '0',
  //     address: 'Home adress',
  //     city: 'Istanbul',
  //     county: 'Besiktas',
  //     district: 'Bebek',
  //     flat: 2,
  //     floor: 3,
  //     title: 'home'
  //   }));
  //   cy.gqlQuery({ type: 'myAddresses', opts: { isEmpty: false } });
  //   cy.gqlQuery({ type: 'restaurants', opts: { isEmpty: false } });
  //   cy.gqlQuery({ type: 'cart', opts: { isEmpty: true } });
  //   cy.gqlQuery({ type: 'menu', opts: { hamburger: true } });
  //   cy.contains('Hamburger Test Restaurant').click();
  //   cy.get('[data-cy="menu-item-hamburger"]').click();
  //   cy.get('[data-cy="food-modal-checkbox-pickles"]').children('input').uncheck({ force: true }).should('not.be.checked');
  //   cy.get('[data-cy="food-modal-checkbox-pickles"]').children('input').check({ force: true }).should('be.checked');
  // });

  it('add item to cart when add to cart is clicked', () => {
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
    cy.gqlQuery({ type: 'cart', opts: { isEmpty: true } });
    cy.gqlQuery({ type: 'menu', opts: { hamburger: true } });

    const variables = {
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
      price: 8,
      quantity: 1,
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

    cy.gqlMutation({ type: 'addCartItem', opts: { isEmpty: true, restaurant: 1, menu: 'hamburger' }, variables })
    cy.contains('Hamburger Test Restaurant').click();
    cy.get('[data-cy="menu-item-hamburger"]').click();
    cy.get('[data-cy="food-modal-add-to-cart-button"]').click();
    cy.gqlQuery({
      type: 'cart',
      opts: {
        isEmpty: false,
        type: 'hamburger'
      }
    });

    cy.get('[data-cy="nav-cart-total"]').should((p) => {
      const text = p.text();
      expect(text).to.eq(`$${variables.totalPrice.toFixed(2)}`)
    })
  });

});
