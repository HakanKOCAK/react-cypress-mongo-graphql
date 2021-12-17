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
    cy.gqlMeQuery();
    cy.gqlMyAddresses({ isEmpty: true });
    cy.gqlCitiesQuery();

    cy.get('[data-cy="myAddresses-btn"]').click().should('have.css', 'background-color', 'rgb(178, 245, 234)');
    cy.url().should('contain', '/addresses');
  })

  it('should redirect to /account/credit-cards when my cards clicked', () => {
    //Assume there is an authenticated user
    cy.refreshToken();
    cy.gqlMeQuery();
    cy.gqlMyAddresses({ isEmpty: true });
    cy.gqlMyCreditCards({ isEmpty: true });
    cy.gqlCitiesQuery();

    cy.get('[data-cy="myCards-btn"]').click().should('have.css', 'background-color', 'rgb(178, 245, 234)');
    cy.url().should('contain', '/credit-cards');
  })
});
