/// <reference types="cypress" />

describe('Add Card Tests', () => {
  beforeEach(() => {
    //Go to account
    cy.visit('/account/credit-cards');

    //Assume there is an authenticated user
    cy.refreshToken();
    cy.gqlQuery({ type: 'me' });
    cy.gqlQuery({ type: 'myCreditCards', opts: { isEmpty: true } });
    cy.contains('Add a credit card').click();
  });

  it('should close new card modal when cancel is clicked', () => {
    cy.get('[data-cy="new-card-cancel-btn"]').click();
    cy.get('New Credit Card').should('not.exist');
  });

  it('save button should be disabled when description is empty', () => {
    cy.get('[data-cy="description-input"]').focus();
    cy.get('[data-cy="number-input"]').type('343333333333333');
    cy.get('[data-cy="holder-input"]').type('Hakan Kocak');
    cy.get('[data-cy="expiry-input"]').type('1232');
    cy.get('[data-cy="cvc-input"]').type('1234');
    cy.get('[data-cy="save-card-btn"]').should('be.disabled');
  });

  it('save button should be disabled when card number is empty', () => {
    cy.get('[data-cy="description-input"]').type('Amex card');
    cy.get('[data-cy="number-input"]').focus();
    cy.get('[data-cy="holder-input"]').type('Hakan Kocak');
    cy.get('[data-cy="expiry-input"]').type('1232');
    cy.get('[data-cy="cvc-input"]').type('1234');
    cy.get('[data-cy="save-card-btn"]').should('be.disabled');
  });

  it('save button should be disabled when card number is invalid', () => {
    cy.get('[data-cy="description-input"]').type('Amex card');
    cy.get('[data-cy="number-input"]').type('34333333333333');
    cy.get('[data-cy="holder-input"]').type('Hakan Kocak');
    cy.get('[data-cy="expiry-input"]').type('1232');
    cy.get('[data-cy="cvc-input"]').type('1234');
    cy.get('[data-cy="save-card-btn"]').should('be.disabled');
  });

  it('save button should be disabled when card holder is empty', () => {
    cy.get('[data-cy="description-input"]').type('Amex card');
    cy.get('[data-cy="number-input"]').type('343333333333333');
    cy.get('[data-cy="holder-input"]').focus();
    cy.get('[data-cy="expiry-input"]').type('1232');
    cy.get('[data-cy="cvc-input"]').type('1234');
    cy.get('[data-cy="save-card-btn"]').should('be.disabled');
  });

  it('save button should be disabled when expiry is empty', () => {
    cy.get('[data-cy="description-input"]').type('Amex card');
    cy.get('[data-cy="number-input"]').type('343333333333333');
    cy.get('[data-cy="holder-input"]').type('Hakan Kocak');
    cy.get('[data-cy="expiry-input"]').children().focus();
    cy.get('[data-cy="cvc-input"]').type('1234');
    cy.get('[data-cy="save-card-btn"]').should('be.disabled');
  });

  it('save button should be disabled when expiry is invalid', () => {
    cy.get('[data-cy="description-input"]').type('Amex card');
    cy.get('[data-cy="number-input"]').type('343333333333333');
    cy.get('[data-cy="holder-input"]').type('Hakan Kocak');
    cy.get('[data-cy="expiry-input"]').type('123');
    cy.get('[data-cy="cvc-input"]').type('1234');
    cy.get('[data-cy="save-card-btn"]').should('be.disabled');
  });

  it('save button should be disabled when cvc is empty', () => {
    cy.get('[data-cy="description-input"]').type('Amex card');
    cy.get('[data-cy="number-input"]').type('343333333333333');
    cy.get('[data-cy="holder-input"]').type('Hakan Kocak');
    cy.get('[data-cy="expiry-input"]').type('1232');
    cy.get('[data-cy="cvc-input"]').focus();
    cy.get('[data-cy="save-card-btn"]').should('be.disabled');
  });

  it('save button should be disabled when cvc is invalid', () => {
    cy.get('[data-cy="description-input"]').type('Amex card');
    cy.get('[data-cy="number-input"]').type('343333333333333');
    cy.get('[data-cy="holder-input"]').type('Hakan Kocak');
    cy.get('[data-cy="expiry-input"]').type('1234');
    cy.get('[data-cy="save-card-btn"]').should('be.disabled');
  });

  it('save button should not be disabled when all inputs are valid', () => {
    cy.get('[data-cy="description-input"]').type('Amex card');
    cy.get('[data-cy="number-input"]').type('343333333333333');
    cy.get('[data-cy="holder-input"]').type('Hakan Kocak');
    cy.get('[data-cy="expiry-input"]').type('1234');
    cy.get('[data-cy="cvc-input"]').type('1234');
    cy.get('[data-cy="save-card-btn"]').should('not.be.disabled');
  });

  it('should save credit card when save clicked', () => {
    const variables = {
      description: 'Amex card',
      number: '343333333333333',
      holder: 'Hakan Kocak',
      expiry: '12/34',
      cvc: '1234',
      issuer: 'amex'
    }
    cy.gqlMutation({
      type: 'addCreditCard',
      opts: { isEmpty: true },
      variables
    });
    cy.get('[data-cy="description-input"]').type(variables.description);
    cy.get('[data-cy="number-input"]').type(variables.number);
    cy.get('[data-cy="holder-input"]').type(variables.holder);
    cy.get('[data-cy="expiry-input"]').type(variables.expiry.split('/').join(''));
    cy.get('[data-cy="cvc-input"]').type(variables.cvc);
    cy.get('[data-cy="save-card-btn"]').click();
    cy.contains('New Card').should('not.exist');
    cy.contains('Amex card').should('be.visible');
  });
});