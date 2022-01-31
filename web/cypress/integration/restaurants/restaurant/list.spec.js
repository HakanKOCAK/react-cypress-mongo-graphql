/// <reference types="cypress" />

describe('Restaurant List', () => {
  before(() => {
    //Go to restaurants
    cy.visit('/restaurants');
  });

  it('should redirect to /login when authenticated user is not exists', () => {
    cy.url().should('include', '/login')
  });

  context('Authenticated user', () => {
    before(() => {
      //Login user
      cy.visit('/login');
      cy.get('[data-cy="email-input"]').type('testaccount@test.com');
      cy.get('[data-cy="password-input"]').type('123456');
      cy.get('[data-cy="login-button"]').click();
    });

    it('should display please select an address text and filter and sort buttons should be disabled when there is not a selected address', () => {
      cy.contains('Filter').should('be.disabled');
      cy.contains('Sort').should('be.disabled');
      cy.get('h2').contains('please select an address', { matchCase: false }).should('be.visible')
    });

    it('should display no restaurant text when address is selected but there is not a restaurant', () => {
      cy.contains('Please select an address').click();
      cy.contains('No restaurant address').click();
      cy.contains('There are no restaurant that delivers to this address or satisfies given filters').should('be.visible')
    });

    it('should open filter modal when filter button clicked', () => {
      cy.contains('No restaurant address').click();
      cy.contains('Home address').click();
      cy.get('[data-cy="restaurant-list-filter-button"]').click();
      cy.get('header').contains('Filter').should('be.visible');
    });

    it('should open sort modal when sort button clicked', () => {
      cy.contains('Close').click();
      cy.get('[data-cy="restaurant-list-sort-button"]').click();
      cy.get('p').contains('Sort').should('be.visible');
    });

    it('should redirect to restaurant page on restaurant click', () => {
      cy.contains('Hamburger Test Restaurant').click();

      cy.contains('Menu').should('be.visible');
      cy.contains('Mains').should('be.visible');
    });

    context('Filter Tests', () => {
      before(() => {
        cy.contains('Restaurants').click();
      });

      it('should filter restaurants by food type when a type is set', () => {
        cy.contains('Pizza Test Restaurant').should('be.visible');
        cy.contains('Hamburger Test Restaurant').should('be.visible');
        cy.get('[data-cy="restaurant-list-filter-button"]').click();
        cy.get('[data-cy="filter-hamburger-checkbox"]').click();
        cy.get('[data-cy="restaurant-filter-button"]').click();
        cy.contains('Pizza Test Restaurant').should('not.exist');
        cy.contains('Hamburger Test Restaurant').should('be.visible');
      });

      it('should filter restaurants by min amount when min amount is set', () => {
        cy.get('[data-cy="restaurant-list-filter-button"]').click();
        cy.contains('Pizza Test Restaurant').should('be.visible');
        cy.contains('Hamburger Test Restaurant').should('be.visible');
        cy.get('[data-cy="restaurant-list-filter-button"]').click();
        const clickRightArrow = '{rightarrow}'.repeat(15);
        cy.get('[data-cy="min-amount-slider"]').click().type(clickRightArrow);
        cy.get('[data-cy="restaurant-filter-button"]').click();
        cy.contains('Pizza Test Restaurant').should('be.visible');
        cy.contains('Hamburger Test Restaurant').should('not.exist');
      });

      it('should filter restaurants by estimated delivery time when estimated delivery time is set', () => {
        cy.get('[data-cy="restaurant-list-filter-button"]').click();
        cy.contains('Pizza Test Restaurant').should('be.visible');
        cy.contains('Hamburger Test Restaurant').should('be.visible');
        cy.get('[data-cy="restaurant-list-filter-button"]').click();
        const clickLeftArrow = '{leftarrow}'.repeat(19);
        cy.get('[data-cy="delivery-slider"]').click().type(clickLeftArrow);
        cy.get('[data-cy="restaurant-filter-button"]').click();
        cy.contains('Pizza Test Restaurant').should('not.exist');
        cy.contains('Hamburger Test Restaurant').should('be.visible');
      });

      it('should be able to filter by multiple options', () => {
        cy.get('[data-cy="restaurant-list-filter-button"]').click();
        cy.contains('Pizza Test Restaurant').should('be.visible');
        cy.contains('Hamburger Test Restaurant').should('be.visible');
        cy.get('[data-cy="restaurant-list-filter-button"]').click();
        cy.get('[data-cy="filter-hamburger-checkbox"]').click();
        const clickLeftArrow = '{leftarrow}'.repeat(17);
        const clickRightArrow = '{rightarrow}'.repeat(22);
        cy.get('[data-cy="min-amount-slider"]').click().type(clickRightArrow);
        cy.get('[data-cy="delivery-slider"]').click().type(clickLeftArrow);
        cy.get('[data-cy="restaurant-filter-button"]').click();
        cy.contains('Pizza Test Restaurant').should('not.exist');
        cy.contains('Hamburger Test Restaurant').should('be.visible');
      });

      it('should remove filters when remove filters clicked', () => {
        cy.contains('Pizza Test Restaurant').should('not.exist');
        cy.contains('Hamburger Test Restaurant').should('be.visible');
        cy.get('[data-cy="restaurant-list-filter-button"]').click();
        cy.contains('Pizza Test Restaurant').should('be.visible');
        cy.contains('Hamburger Test Restaurant').should('be.visible');
      });
    });

    context('Sort Tests', () => {
      it('should sort alphabetically when alphabetical selected', () => {
        cy.get('h2').eq(6).should('have.text', 'Hamburger Test Restaurant');
        cy.get('h2').eq(7).should('have.text', 'Pizza Test Restaurant');
        cy.get('[data-cy="restaurant-list-sort-button"]').click();
        cy.contains('Alphabetical').click();
        cy.get('h2').eq(6).should('have.text', 'Hamburger Test Restaurant');
        cy.get('h2').eq(7).should('have.text', 'Pizza Test Restaurant');
      });

      it('should sort by min amount(ascending) when Min Amount - Ascending selected', () => {
        cy.get('h2').eq(6).should('have.text', 'Hamburger Test Restaurant');
        cy.get('h2').eq(7).should('have.text', 'Pizza Test Restaurant');
        cy.contains('Min Amount - Ascending').click();
        cy.get('h2').eq(6).should('have.text', 'Pizza Test Restaurant');
        cy.get('h2').eq(7).should('have.text', 'Hamburger Test Restaurant');
      });

      it('should sort by min amount(descending) when Min Amount - Descending selected', () => {
        cy.get('h2').eq(6).should('have.text', 'Pizza Test Restaurant');
        cy.get('h2').eq(7).should('have.text', 'Hamburger Test Restaurant');
        cy.contains('Min Amount - Descending').click();
        cy.get('h2').eq(6).should('have.text', 'Hamburger Test Restaurant');
        cy.get('h2').eq(7).should('have.text', 'Pizza Test Restaurant');
      });


      it('should sort by max arrival(descending) when Max Arrival - Descending selected', () => {
        cy.get('h2').eq(6).should('have.text', 'Hamburger Test Restaurant');
        cy.get('h2').eq(7).should('have.text', 'Pizza Test Restaurant');
        cy.contains('Max Arrival - Descending').click();
        cy.get('h2').eq(6).should('have.text', 'Pizza Test Restaurant');
        cy.get('h2').eq(7).should('have.text', 'Hamburger Test Restaurant');
      });

      it('should sort by max arrival(asceding) when Max Arrival - Ascending selected', () => {
        cy.get('h2').eq(6).should('have.text', 'Pizza Test Restaurant');
        cy.get('h2').eq(7).should('have.text', 'Hamburger Test Restaurant');
        cy.contains('Max Arrival - Ascending').click();
        cy.get('h2').eq(6).should('have.text', 'Hamburger Test Restaurant');
        cy.get('h2').eq(7).should('have.text', 'Pizza Test Restaurant');
      });

      it('should remove sort parameters when same option re-selected', () => {
        cy.contains('Min Amount - Ascending').click();
        cy.get('h2').eq(6).should('have.text', 'Pizza Test Restaurant');
        cy.get('h2').eq(7).should('have.text', 'Hamburger Test Restaurant');
        cy.contains('Min Amount - Ascending').click();
        cy.get('h2').eq(6).should('have.text', 'Hamburger Test Restaurant');
        cy.get('h2').eq(7).should('have.text', 'Pizza Test Restaurant');
      });
    });
  });
});