/// <reference types="cypress" />

describe('Restaurant Menu', () => {
  before(() => {
    //Go to restaurants
    cy.visit('/restaurants');
  });

  it('should redirect to /login when authenticated user is not exists', () => {
    cy.url().should('include', '/login')
  });

  context('Authenticated User', () => {
    before(() => {
      //Login user
      cy.visit('/login');
      cy.get('[data-cy="email-input"]').type('testaccount@test.com');
      cy.get('[data-cy="password-input"]').type('123456');
      cy.get('[data-cy="login-button"]').click();
      cy.contains('Please select an address').click();
      cy.contains('Home address').click();
    });

    it('should open food modal when an item clicked', () => {
      cy.contains('Hamburger Test Restaurant').click();
      cy.get('[data-cy="menu-item-hamburger"]').click();
      cy.contains('Add to Cart').should('be.visible');
    });

    it('should close food modal when close button clicked', () => {
      cy.get('[data-cy="food-modal-close-button"]').click();
      cy.contains('Add to Cart').should('not.exist');
    });

    it('add to cart button should be disabled when type is not selected', () => {
      cy.get('[data-cy="menu-item-sprite"]').click();
      cy.get('[data-cy="food-modal-add-to-cart-button"]').should('be.disabled');
    });

    it('add to cart button should be enabled when type is selected', () => {
      cy.contains('Light').click();
      cy.get('[data-cy="food-modal-add-to-cart-button"]').should('be.enabled');
    });

    it('total price should change when medium is selected', () => {
      cy.get('[data-cy="food-modal-close-button"]').click();
      cy.contains('Restaurants').click();
      cy.contains('Pizza Test Restaurant').click();
      cy.get('[data-cy="menu-item-margherita"]').click();
      cy.get('[data-cy="food-modal-total"]').invoke('text').then((text1) => {
        cy.contains('Medium').click();
        cy.get('[data-cy="food-modal-total"]').invoke('text').should((text2) => {
          expect(text1).not.to.eq(text2);
        })
      })
    });

    it('total price should change when a meal is selected', () => {
      cy.get('[data-cy="food-modal-close-button"]').click();
      cy.contains('Restaurants').click();
      cy.contains('Hamburger Test Restaurant').click();
      cy.get('[data-cy="menu-item-hamburger"]').click();
      cy.get('[data-cy="food-modal-total"]').invoke('text').then((text1) => {
        cy.contains('Medium').click();
        cy.get('[data-cy="food-modal-total"]').invoke('text').should((text2) => {
          expect(text1).not.to.eq(text2);
        })
      })
    });

    it('decrease quantity should be disabled when quantity is 1', () => {
      cy.get('[data-cy="food-modal-decrease-quantity"]').should('be.disabled');
    });

    it('decrease quantity should be enabled when quantity higher than 1', () => {
      cy.get('[data-cy="food-modal-decrease-quantity"]').should('be.disabled');
      cy.get('[data-cy="food-modal-increase-quantity"]').click();
      cy.get('[data-cy="food-modal-decrease-quantity"]').should('be.enabled');
    });

    it('total price should change when quantity changes', () => {
      cy.get('[data-cy="food-modal-total"]').invoke('text').then((text1) => {
        cy.get('[data-cy="food-modal-increase-quantity"]').click();
        cy.get('[data-cy="food-modal-total"]').invoke('text').should((text2) => {
          expect(text1).not.to.eq(text2);
        })
      })
    });

    it('optional item should become not selected when its selected and clicked', () => {
      cy.get('[data-cy="food-modal-checkbox-pickles"]').children('input').uncheck({ force: true }).should('not.be.checked');
    });

    it('optional item should become selected when its not selected and clicked', () => {
      cy.get('[data-cy="food-modal-checkbox-pickles"]').children('input').check({ force: true }).should('be.checked');
    });

    it('add item to cart when add to cart is clicked', () => {
      cy.visit('/login');
      cy.get('[data-cy="email-input"]').type('testaccount@test.com');
      cy.get('[data-cy="password-input"]').type('123456');
      cy.get('[data-cy="login-button"]').click();
      cy.contains('Please select an address').click();
      cy.contains('Home address').click();
      cy.contains('Hamburger Test Restaurant').click();
      cy.get('[data-cy="menu-item-hamburger"]').click();
      cy.get('[data-cy="nav-cart-total"]').invoke('text').then((text1) => {
        cy.get('[data-cy="food-modal-add-to-cart-button"]').click();
        cy.wait(1000);
        cy.get('[data-cy="nav-cart-total"]').invoke('text').then((text2) => {
          expect(text1).not.to.eq(text2);
        });
      });
    });
  });
});
