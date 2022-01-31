/// <reference types="cypress" />

describe('Navbar Tests', () => {
  context('Tests without authenticated user', () => {
    it('navbar should display login and register button when there is not an authenticated user', () => {
      cy.visit('/restaurants');
      cy.get('[data-cy="navbar-login-btn"]').should('be.visible');
      cy.get('[data-cy="navbar-register-btn"]').should('be.visible');
    });

    it('should navigate to /login when fooder clicked', () => {
      cy.visit('/register');
      cy.get('[data-cy="navbar-login-btn"]').should('be.visible');
      cy.get('[data-cy="navbar-register-btn"]').should('be.visible');
      cy.get('[data-cy="navbar-fooder-container"]').children().click();
      cy.url().should('contain', '/login');
    });

    it('should navigate to /login when login button clicked', () => {
      cy.visit('/register');
      cy.get('[data-cy="navbar-login-btn"]').click();
      cy.url().should('contain', '/login');
    });

    it('should navigate to /login when register button clicked', () => {
      cy.visit('/login');
      cy.get('[data-cy="navbar-register-btn"]').click();
      cy.url().should('contain', '/register');
    });
  });

  context('Tests with authenticated user', () => {
    before(() => {
      //Login user
      cy.visit('/login');
      cy.get('[data-cy="email-input"]').type('testaccount@test.com');
      cy.get('[data-cy="password-input"]').type('123456');
      cy.get('[data-cy="login-button"]').click();
    });

    it('navbar should contain button after with auth user\'s name when there is an authenticated user', () => {
      cy.get('[data-cy="navbar-user-btn"]').should('be.visible');
    });

    it('navbar should not contain login and register buttons when there is an authenticated user', () => {
      cy.get('[data-cy="navbar-user-btn"]').should('be.visible');
      cy.get('[data-cy="navbar-login-btn"]').should('not.exist');
      cy.get('[data-cy="navbar-register-btn"]').should('not.exist');
    });

    it('a menu should open when user named button clicked', () => {
      cy.get('[data-cy="navbar-user-btn"]').click();
      cy.contains('Logout').should('be.visible')
    });

    it('should navigate to /account when account element clicked ', () => {
      cy.get('[data-cy="navbar-go-to-account-btn"]').click();
      cy.url().should('contain', '/account');
    });

    it('<- Restaurants button should be visible when user is not at restaurants page', () => {
      cy.get('[data-cy="navbar-go-back-to-restaurants-btn"]').should('be.visible');
    });

    it('should navigate to restaurants page when fooder clicked', () => {
      cy.get('[data-cy="navbar-fooder-container"]').children().click();
      cy.url().should('contain', '/restaurants');
    });

    it('should navigate to restaurants page when <- Restaurants button clicked', () => {
      cy.get('[data-cy="navbar-user-btn"]').click();
      cy.get('[data-cy="navbar-go-to-account-btn"]').click();
      cy.get('[data-cy="navbar-go-back-to-restaurants-btn"]').click();
      cy.url().should('contain', '/restaurants');
    });

    it('should logout user navigate to login page logout clicked', () => {
      cy.get('[data-cy="navbar-user-btn"]').click();
      cy.get('[data-cy="navbar-logout-btn"]').click();
      cy.url().should('contain', '/login');
    });
  });
});
