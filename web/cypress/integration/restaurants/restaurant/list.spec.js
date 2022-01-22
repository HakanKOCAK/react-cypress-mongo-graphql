/// <reference types="cypress" />

describe('Restaurant List', () => {
  beforeEach(() => {
    //Assume there is an authenticated user
    cy.refreshToken();
    cy.gqlQuery({ type: 'me' });

    //Go to restaurants
    cy.visit('/restaurants');
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
  })

  it('should display please select an address text and filter and sort buttons should be disabled when there is not a selected address', () => {
    cy.gqlQuery({ type: 'myAddresses', opts: { isEmpty: false } });
    cy.gqlQuery({ type: 'cart', opts: { isEmpty: true } });

    cy.contains('Filter').should('be.disabled');
    cy.contains('Sort').should('be.disabled');
    cy.get('h2').contains('please select an address', { matchCase: false }).should('be.visible')
  })

  it('should display no restaurant text when address is selected but there is not a restaurant', () => {
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
    cy.gqlQuery({ type: 'cart', opts: { isEmpty: true } });

    cy.gqlQuery({ type: 'myAddresses', opts: { isEmpty: false } });
    cy.gqlQuery({ type: 'restaurants', opts: { isEmpty: true } });
    cy.contains('There are no restaurant that delivers to this address or satisfies given filters').should('be.visible')
  });

  it('should display restaurant list when restaurant(s) exists for selected address', () => {
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
    cy.gqlQuery({ type: 'cart', opts: { isEmpty: true } });
    cy.gqlQuery({ type: 'restaurants', opts: { isEmpty: false } });
    cy.contains('Pizza Test Restaurant').should('be.visible');
    cy.contains('Hamburger Test Restaurant').should('be.visible');
  });

  it('should open filter modal when filter button clicked', () => {
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
    cy.gqlQuery({ type: 'cart', opts: { isEmpty: true } });
    cy.gqlQuery({ type: 'restaurants', opts: { isEmpty: false } });
    cy.get('[data-cy="restaurant-list-filter-button"]').click();
    cy.get('header').contains('Filter').should('be.visible');
  });

  it('should open sort modal when sort button clicked', () => {
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
    cy.gqlQuery({ type: 'cart', opts: { isEmpty: true } });
    cy.gqlQuery({ type: 'restaurants', opts: { isEmpty: false } });
    cy.get('[data-cy="restaurant-list-sort-button"]').click();
    cy.get('p').contains('Sort').should('be.visible');
  });

  it('should redirect to restaurant page on restaurant click', () => {
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
    cy.gqlQuery({ type: 'cart', opts: { isEmpty: true } });
    cy.gqlQuery({ type: 'restaurants', opts: { isEmpty: false } });

    cy.gqlQuery({ type: 'menu', opts: { pizza: true } });
    cy.contains('Pizza Test Restaurant').click();

    cy.contains('Menu').should('be.visible');
    cy.contains('Mains').should('be.visible');
  });

  context('Filter Tests', () => {
    beforeEach(() => {
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
      cy.gqlQuery({ type: 'cart', opts: { isEmpty: true } });
      cy.gqlQuery({ type: 'restaurants', opts: { isEmpty: false } });

      cy.contains('Pizza Test Restaurant').should('be.visible');
      cy.contains('Hamburger Test Restaurant').should('be.visible');
    });

    it('should filter restaurants by food type when a type is selected', () => {
      cy.get('[data-cy="restaurant-list-filter-button"]').click();
      cy.get('[data-cy="filter-hamburger-checkbox"]').click();
      cy.get('[data-cy="restaurant-filter-button"]').click();
      cy.contains('Pizza Test Restaurant').should('not.exist');
      cy.contains('Hamburger Test Restaurant').should('be.visible');
    });

    it('should filter restaurants by min amount when min amount is selected', () => {
      cy.get('[data-cy="restaurant-list-filter-button"]').click();
      const clickRightArrow = '{rightarrow}'.repeat(5);
      cy.get('[data-cy="min-amount-slider"]').click().type(clickRightArrow);
      cy.get('[data-cy="restaurant-filter-button"]').click();
      cy.contains('There are no restaurant that delivers to this address or satisfies given filters').should('be.visible');
    });

    it('should filter restaurants by estimated delivery time whenestimated delivery time is selected', () => {
      cy.get('[data-cy="restaurant-list-filter-button"]').click();
      const clickLeftArrow = '{leftarrow}'.repeat(17);
      cy.get('[data-cy="delivery-slider"]').click().type(clickLeftArrow);
      cy.get('[data-cy="restaurant-filter-button"]').click();
      cy.contains('Pizza Test Restaurant').should('not.exist');
      cy.contains('Hamburger Test Restaurant').should('be.visible');
    });

    it('should be able to filter by multiple options', () => {
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
      cy.get('[data-cy="restaurant-list-filter-button"]').click();
      cy.get('[data-cy="filter-hamburger-checkbox"]').click();
      const clickLeftArrow = '{leftarrow}'.repeat(17);
      const clickRightArrow = '{rightarrow}'.repeat(22);
      cy.get('[data-cy="min-amount-slider"]').click().type(clickRightArrow);
      cy.get('[data-cy="delivery-slider"]').click().type(clickLeftArrow);
      cy.get('[data-cy="restaurant-filter-button"]').click();
      cy.contains('Pizza Test Restaurant').should('not.exist');
      cy.contains('Hamburger Test Restaurant').should('be.visible');
      cy.get('[data-cy="restaurant-list-filter-button"]').click();
      cy.contains('Pizza Test Restaurant').should('be.visible');
    });
  });

  context('Sort Tests', () => {
    beforeEach(() => {
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

      //Assume there is an authenticated user
      cy.refreshToken();
      cy.gqlQuery({ type: 'me' });

      cy.gqlQuery({ type: 'myAddresses', opts: { isEmpty: false } });
      cy.gqlQuery({ type: 'cart', opts: { isEmpty: true } });
      cy.gqlQuery({ type: 'restaurants', opts: { isEmpty: false } });

      cy.contains('Pizza Test Restaurant').should('be.visible');
      cy.contains('Hamburger Test Restaurant').should('be.visible');
    });

    it('should sort alphabetically when alphabetical selected', () => {
      cy.get('h2').eq(6).should('have.text', 'Pizza Test Restaurant');
      cy.get('[data-cy="restaurant-list-sort-button"]').click();
      cy.contains('Alphabetical').click();
      cy.get('h2').eq(6).should('have.text', 'Hamburger Test Restaurant');
    });

    it('should sort by min amount(asceding) when Min Amount - Ascending selected', () => {
      cy.get('h2').eq(6).should('have.text', 'Pizza Test Restaurant');
      cy.get('[data-cy="restaurant-list-sort-button"]').click();
      cy.contains('Min Amount - Ascending').click();
      cy.get('h2').eq(6).should('have.text', 'Pizza Test Restaurant');
    });

    it('should sort by min amount(descending) when Min Amount - Descending selected', () => {
      cy.get('h2').eq(6).should('have.text', 'Pizza Test Restaurant');
      cy.get('[data-cy="restaurant-list-sort-button"]').click();
      cy.contains('Min Amount - Descending').click();
      cy.get('h2').eq(6).should('have.text', 'Hamburger Test Restaurant');
    });

    it('should sort by max arrival(asceding) when Max Arrival - Ascending selected', () => {
      cy.get('h2').eq(6).should('have.text', 'Pizza Test Restaurant');
      cy.get('[data-cy="restaurant-list-sort-button"]').click();
      cy.contains('Max Arrival - Ascending').click();
      cy.get('h2').eq(6).should('have.text', 'Hamburger Test Restaurant');
    });

    it('should sort by max arrival(descending) when Max Arrival - Descending selected', () => {
      cy.get('h2').eq(6).should('have.text', 'Pizza Test Restaurant');
      cy.get('[data-cy="restaurant-list-sort-button"]').click();
      cy.contains('Max Arrival - Descending').click();
      cy.get('h2').eq(6).should('have.text', 'Pizza Test Restaurant');
    });

    it('should remove sort parameters when same option re-selected', () => {
      cy.get('h2').eq(6).should('have.text', 'Pizza Test Restaurant');
      cy.get('[data-cy="restaurant-list-sort-button"]').click();
      cy.contains('Max Arrival - Ascending').click();
      cy.get('h2').eq(6).should('have.text', 'Hamburger Test Restaurant');
      cy.contains('Max Arrival - Ascending').click();
      cy.get('h2').eq(6).should('have.text', 'Pizza Test Restaurant');
    });
  });
});