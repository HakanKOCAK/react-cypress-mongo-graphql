/// <reference types="cypress" />

describe('Register tests', () => {
  beforeEach(() => {
    //Go to register
    cy.visit('/register');
  });

  it('should display required message when name input is empty', () => {
    cy.get('[data-cy="surname-input"]').type('Kocak');
    cy.get('[data-cy="email-input"]').type('random@mail.com');
    cy.get('[data-cy="password-input"]').type('123456');
    cy.get('[data-cy="confirm-password-input"]').type('123456');
    cy.get('[data-cy="register-button"]').click('');
    cy.contains('Required').should('be.visible');
  });

  it('should display required message when surname input is empty', () => {
    cy.get('[data-cy="name-input"]').type('Hakan');
    cy.get('[data-cy="email-input"]').type('random@mail.com');
    cy.get('[data-cy="password-input"]').type('123456');
    cy.get('[data-cy="confirm-password-input"]').type('123456');
    cy.get('[data-cy="register-button"]').click('');
    cy.contains('Required').should('be.visible');
  });

  it('should display required message when email input is empty', () => {
    cy.get('[data-cy="name-input"]').type('Hakan');
    cy.get('[data-cy="surname-input"]').type('Kocak');
    cy.get('[data-cy="password-input"]').type('123456');
    cy.get('[data-cy="confirm-password-input"]').type('123456');
    cy.get('[data-cy="register-button"]').click('');
    cy.contains('Required').should('be.visible');
  });

  it('should display invalid email message when email address is invalid', () => {
    cy.get('[data-cy="name-input"]').type('Hakan');
    cy.get('[data-cy="surname-input"]').type('Kocak');
    cy.get('[data-cy="email-input"]').type('random@mail');
    cy.get('[data-cy="password-input"]').type('123456');
    cy.get('[data-cy="confirm-password-input"]').type('123456');
    cy.get('[data-cy="register-button"]').click('');
    cy.contains('Invalid email').should('be.visible');
  });

  it('should display invalid password when password length is smaller than 6', () => {
    cy.get('[data-cy="name-input"]').type('Hakan');
    cy.get('[data-cy="surname-input"]').type('Kocak');
    cy.get('[data-cy="email-input"]').type('random@mail.com');
    cy.get('[data-cy="password-input"]').type('12345');
    cy.get('[data-cy="confirm-password-input"]').type('12345');
    cy.get('[data-cy="register-button"]').click('');
    cy.contains('Invalid password').should('be.visible');
  });

  it('should display passwords dont match when try to register with not matching pws', () => {
    cy.get('[data-cy="name-input"]').type('Hakan');
    cy.get('[data-cy="surname-input"]').type('Kocak');
    cy.get('[data-cy="email-input"]').type('random@mail.com');
    cy.get('[data-cy="password-input"]').type('123456');
    cy.get('[data-cy="confirm-password-input"]').type('123457');
    cy.get('[data-cy="register-button"]').click('');
    cy.contains('Passwords don\'t match').should('be.visible');
  });

  it('should navigate to login page when login link clicked', () => {
    cy.get('[href="/login"]').click();
    cy.contains('h2', 'Login').should('be.visible')
  });

  it('should display email in use when try to register with same email address', () => {
    //Mock request
    cy.intercept('POST', 'http://localhost:4000/graphql', {
      body: { data: { register: null }, errors: [{ message: 'emailInUse' }] }
    }).as('gqlRegisterMutation');

    cy.get('[data-cy="name-input"]').type('Hakan');
    cy.get('[data-cy="surname-input"]').type('Kocak');
    cy.get('[data-cy="email-input"]').type('random@mail.com');
    cy.get('[data-cy="password-input"]').type('123456');
    cy.get('[data-cy="confirm-password-input"]').type('123456');
    cy.get('[data-cy="register-button"]').click('');

    cy.wait('@gqlRegisterMutation');
    cy.contains('Email already in use').should('be.visible');

  });

  it('should redirect to restaurants page when register is successful', () => {
    const variables = {
      id: 'randomId',
      name: 'Hakan',
      surname: 'Kocak',
      email: 'random@mail.com',
      accessToken: 'accessToken'
    }
    //Mock request
    cy.gqlMutation({ type: 'register', variables });
    cy.gqlQuery({ type: 'myAddresses', opts: { isEmpty: false } });
    cy.get('[data-cy="name-input"]').type('Hakan');
    cy.get('[data-cy="surname-input"]').type('Hakan');
    cy.get('[data-cy="email-input"]').type('random@mail.com');
    cy.get('[data-cy="password-input"]').type('123456');
    cy.get('[data-cy="confirm-password-input"]').type('123456');
    cy.get('[data-cy="register-button"]').click('');
    cy.url().should('include', '/restaurants')
  });
});
