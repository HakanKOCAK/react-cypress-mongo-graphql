/// <reference types="cypress" />

describe('Account tests', () => {
  beforeEach(() => {
    //Go to account
    cy.visit('/account');
  });

  it('should redirect to /login when authenticated user is not exists', () => {
    cy.url().should('include', '/login');
  })

  it('should redirect to /account/addresses when my addresses clicked', () => {
    //Assume there is an authenticated user
    cy.refreshToken();
    cy.gqlQuery({ type: 'me' });
    cy.gqlQuery({ type: 'myAddresses', opts: { isEmpty: true } });
    cy.gqlQuery({ type: 'cities' });

    cy.get('[data-cy="myAddresses-btn"]').click().should('have.css', 'background-color', 'rgb(178, 245, 234)');
    cy.url().should('contain', '/addresses');
  })

  it('should redirect to /account/credit-cards when my cards clicked', () => {
    //Assume there is an authenticated user
    cy.refreshToken();
    cy.gqlQuery({ type: 'me' });
    cy.gqlQuery({ type: 'myAddresses', opts: { isEmpty: true } });
    cy.gqlQuery({ type: 'myCreditCards', opts: { isEmpty: true } });
    cy.gqlQuery({ type: 'cities' });

    cy.get('[data-cy="myCards-btn"]').click().should('have.css', 'background-color', 'rgb(178, 245, 234)');
    cy.url().should('contain', '/credit-cards');
  })

  it('should redirect to /account/orders when my orders clicked', () => {
    //Assume there is an authenticated user
    cy.refreshToken();
    cy.gqlQuery({ type: 'me' });
    cy.gqlQuery({ type: 'myAddresses', opts: { isEmpty: true } });
    cy.gqlQuery({ type: 'myCreditCards', opts: { isEmpty: true } });
    cy.gqlQuery({ type: 'myOrders', opts: { isEmpty: true } });
    cy.gqlQuery({ type: 'cities' });

    cy.get('[data-cy="myOrders-btn"]').click().should('have.css', 'background-color', 'rgb(178, 245, 234)');
    cy.url().should('contain', '/orders');
  })
});
