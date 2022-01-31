/// <reference types="cypress" />

describe('Address List', () => {
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
    });

    it('should display please select an address when there is an authenticated user', () => {
      cy.contains('Please select an address').should('be.visible')
    });

    it('should open address list when please select an address clicked', () => {
      cy.contains('Please select an address').click();
      cy.contains('My Addresses').should('be.visible');
    });

    it('should close address list when close button clicked', () => {
      cy.get('[data-cy="address-list-close-btn"]').click()
      cy.contains('Please select an address').should('be.visible')
    });

    it('should change background to teal to inform user that address is selected when clicked on an address', () => {
      cy.contains('Please select an address').click();
      cy.contains('Home address').click();
      cy.contains('Home address').click();
      cy.get('[data-cy="address-1"]').should('have.css', 'background-color', 'rgb(56, 178, 172)');
    });

    it('should open new address modal when add an address clicked', () => {
      cy.contains('Add an address').click();
      cy.contains('New Address').should('be.visible');
    });

    it('should open delete modal when delete button of an address clicked', () => {
      cy.contains('Close').click();
      cy.get('[data-cy="delete-btn-Other-address"]').click();
      cy.contains('Delete Address').should('be.visible');
    });
  });


})