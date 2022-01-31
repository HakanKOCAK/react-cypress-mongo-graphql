/// <reference types="cypress" />

describe('Login tests', () => {
  before(() => {
    //Go to login
    cy.visit('/login');
  });

  beforeEach(() => {
    cy.get('[data-cy="email-input"]').clear();
    cy.get('[data-cy="password-input"]').clear();
  });

  it('should display required message when email is empty and login button clicked', () => {
    cy.get('[data-cy="login-button"]').click('');
    cy.contains('Required').should('be.visible');
  });

  it('should display invalid email message when email is invalid and login button clicked', () => {
    cy.get('[data-cy="email-input"]').type('testaccount@t');
    cy.get('[data-cy="login-button"]').click('');
    cy.contains('Invalid email address').should('be.visible');
  });

  it('should display invalid password when password length is smaller than 6 and login button clicked', () => {
    cy.get('[data-cy="email-input"]').type('testaccount@t@test.com');
    cy.get('[data-cy="password-input"]').type('12345');
    cy.get('[data-cy="login-button"]').click('');
    cy.contains('Invalid password').should('be.visible');
  });

  it('should navigate to register page when register link clicked', () => {
    cy.get('[href="/register"]').click();
    cy.contains('h2', 'Register').should('be.visible')
    cy.get('[href="/login"]').click();
  });

  it('should display invalid credentials when try to login with invalid credentials', () => {
    cy.get('[data-cy="email-input"]').type('random@email.com');
    cy.get('[data-cy="password-input"]').type('123456');
    cy.get('[data-cy="login-button"]').click();
    cy.contains('Invalid credentials').should('be.visible');
  });

  it('should redirect to restaurants page when login is successful', () => {
    cy.get('[data-cy="email-input"]').type('testaccount@test.com');
    cy.get('[data-cy="password-input"]').type('123456');
    cy.get('[data-cy="login-button"]').click();
    cy.url().should('include', '/restaurants')
  });
});
