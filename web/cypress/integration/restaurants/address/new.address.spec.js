/// <reference types="cypress" />=

describe('New Address', () => {
  before(() => {
    //Login user
    cy.visit('/login');
    cy.get('[data-cy="email-input"]').type('testaccount@test.com');
    cy.get('[data-cy="password-input"]').type('123456');
    cy.get('[data-cy="login-button"]').click();
  });

  context('Modal Tests', () => {
    it('should close new address model when close button clicked', () => {
      cy.contains('Please select an address').click();
      cy.contains('Add an address').click();
      cy.get('[data-cy="new-address-close-btn"]').click();
      cy.contains('New Address').should('not.exist');
    })
  })

  context('Field Tests', () => {
    beforeEach(() => {
      cy.contains('Add an address').click();
    });

    afterEach(() => {
      cy.get('[data-cy="new-address-close-btn"]').click();
    });

    context('Title Field', () => {
      it('should have value home when home is selected', () => {
        cy.get('[data-cy="title-select"]').select('Home');
        cy.get('[data-cy="title-select"]').should('have.value', 'Home');
      });

      it('should display required when title is not selected', () => {
        cy.get('[data-cy="title-select"]').focus();
        cy.get('[data-cy="city-select"]').focus();
        cy.contains('Required').should('be.visible');
      });
    });

    context('City Field', () => {
      it('should have value Istanbul when Istanbul is selected', () => {
        cy.get('[data-cy="city-select"]').select('Istanbul');
        cy.get('[data-cy="city-select"]').should('have.value', 'Istanbul');
      });

      it('should display required when city is not selected', () => {
        cy.get('[data-cy="city-select"]').focus();
        cy.get('[data-cy="title-select"]').focus();
        cy.contains('Required').should('be.visible');
      });
    });

    context('County Field', () => {
      it('should be disabled if city is not selected', () => {
        cy.get('[data-cy="county-select"]').should('be.disabled');
      });

      it('should have value Besiktas when Besiktas is selected', () => {
        cy.get('[data-cy="city-select"]').select('Istanbul');
        cy.get('[data-cy="county-select"]').select('Besiktas');
        cy.get('[data-cy="county-select"]').should('have.value', 'Besiktas')
      });

      it('should display required when county is not selected', () => {
        cy.get('[data-cy="city-select"]').select('Istanbul')
        cy.get('[data-cy="county-select"]').select('');
        cy.get('[data-cy="address-input"]').focus();
        cy.contains('Required').should('be.visible');
      });
    });

    context('District Field', () => {
      it('should be disabled if city is not selected', () => {
        cy.get('[data-cy="district-select"]').should('be.disabled');
      });

      it('should be disabled if county is not selected', () => {
        cy.get('[data-cy="city-select"]').select('Istanbul');
        cy.get('[data-cy="district-select"]').should('be.disabled');
      });


      it('should have value Bebek when Bebek is selected', () => {
        cy.get('[data-cy="city-select"]').select('Istanbul');
        cy.get('[data-cy="county-select"]').select('Besiktas');
        cy.get('[data-cy="district-select"]').select('Bebek');
        cy.get('[data-cy="district-select"]').should('have.value', 'Bebek')
      });

      it('should display required when district is not selected', () => {
        cy.get('[data-cy="city-select"]').select('Istanbul');
        cy.get('[data-cy="county-select"]').select('Besiktas');
        cy.get('[data-cy="district-select"]').select('');
        cy.get('[data-cy="address-input"]').focus();
        cy.contains('Required').should('be.visible');
      });
    });

    context('Address Field', () => {
      it('should have value what an awesome address when typed', () => {
        cy.get('[data-cy="address-input"]').type('what an awesome address');
        cy.get('[data-cy="address-input"]').should('have.value', 'what an awesome address');
      });

      it('should display required when address is empty', () => {
        cy.get('[data-cy="address-input"]').focus('');
        cy.get('[data-cy="floor-input"]').focus('');
        cy.contains('Required').should('be.visible');
      });
    });

    context('Floor Field', () => {
      it('should have value 2 when typed 2', () => {
        cy.get('[data-cy="floor-input"]').type('2');
        cy.get('[data-cy="floor-input"]').should('have.value', '2');
      });

      it('should display required when floor is empty', () => {
        cy.get('[data-cy="floor-input"]').focus('');
        cy.get('[data-cy="flat-input"]').focus('');
        cy.contains('Required').should('be.visible');
      });
    });

    context('Flat Field', () => {
      it('should have value 3 when typed', () => {
        cy.get('[data-cy="flat-input"]').type('3');
        cy.get('[data-cy="flat-input"]').should('have.value', '3');
      });

      it('should display required when flat is empty', () => {
        cy.get('[data-cy="flat-input"]').focus('');
        cy.get('[data-cy="floor-input"]').focus('');
        cy.contains('Required').should('be.visible');
      });
    });
  });

  context('Add a new address', () => {
    const date = Date.now().toString();
    it('should add a new address when submit is clicked', () => {
      cy.contains('Add an address').click();
      cy.get('[data-cy="title-select"]').select('Home');
      cy.get('[data-cy="city-select"]').select('Istanbul');
      cy.get('[data-cy="county-select"]').select('Besiktas');
      cy.get('[data-cy="district-select"]').select('Levent');
      cy.get('[data-cy="address-input"]').type(date);
      cy.get('[data-cy="floor-input"]').type('1');
      cy.get('[data-cy="flat-input"]').type('3');
      cy.get('[data-cy="new-address-save-btn"]').click();
      cy.contains('Add an address').should('be.visible');
      cy.contains('p', date).should('be.visible');
    });
  });
});