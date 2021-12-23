/// <reference types="cypress" />

describe('Login tests', () => {
  beforeEach(() => {
    //Go to login
    cy.visit('/login');
  });

  it('should display required message when email is empty and login button clicked', () => {
    cy.get('[data-cy="login-button"]').click('');
    cy.contains('Required').should('be.visible');
  });

  it('should display invalid email message when email is invalid and login button clicked', () => {
    cy.get('[data-cy="email-input"]').type('example@e');
    cy.get('[data-cy="login-button"]').click('');
    cy.contains('Invalid email address').should('be.visible');
  });

  it('should display invalid password when password length is smaller than 6 and login button clicked', () => {
    cy.get('[data-cy="email-input"]').type('example@example.com');
    cy.get('[data-cy="password-input"]').type('12345');
    cy.get('[data-cy="login-button"]').click('');
    cy.contains('Invalid password').should('be.visible');
  });

  it('should navigate to register page when register link clicked', () => {
    cy.get('[href="/register"]').click();
    cy.contains('h2', 'Register').should('be.visible')
  });

  it('should display invalid credentials when try to login with invalid credentials', () => {
    //Mock request
    cy.intercept('POST', 'http://localhost:4000/graphql', {
      body: { data: { login: null }, errors: [{ message: 'invalidCredentials' }] }
    }).as('gqlLoginMutation');

    cy.get('[data-cy="email-input"]').type('random@email.com');
    cy.get('[data-cy="password-input"]').type('123456');
    cy.get('[data-cy="login-button"]').click();

    cy.wait('@gqlLoginMutation');
    cy.contains('Invalid credentials').should('be.visible');

  });

  it('should redirect to restaurants page when login is successful', () => {
    const variables = {
      id: 'randomId',
      name: 'Hakan',
      surname: 'Kocak',
      email: 'random@mail.com',
      accessToken: 'accessToken'
    }
    //Mock request
    cy.gqlQuery({ type: 'myAddresses', opts: { isEmpty: false } });
    cy.gqlMutation({ type: 'login', variables })
    cy.get('[data-cy="email-input"]').type('random@mail.com');
    cy.get('[data-cy="password-input"]').type('123456');
    cy.get('[data-cy="login-button"]').click();
    cy.url().should('include', '/restaurants')
  });
});
