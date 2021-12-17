/// <reference types="cypress" />=

describe('New Address', () => {

  beforeEach(() => {
    //Go to home
    cy.visit('/home');

    //Assume there is an authenticated user
    cy.refreshToken()
    cy.gqlQuery({ type: 'me' });
  })

  context('Modal Tests', () => {
    it('should close new address model when close button clicked', () => {
      cy.gqlQuery({ type: 'myAddresses', opts: { isEmpty: false } });
      cy.gqlQuery({ type: 'cities' });
      cy.contains('Please select an address').click();
      cy.contains('Add an address').click();
      cy.get('[data-cy="new-address-close-btn"]').click();
      cy.contains('New Address').should('not.exist');
    })
  })

  context('Field Tests', () => {
    beforeEach(() => {
      cy.gqlQuery({ type: 'myAddresses', opts: { isEmpty: false } });
      cy.gqlQuery({ type: 'cities' });
      cy.contains('Please select an address').click()
      cy.contains('Add an address').click()
    })

    context('Title Field', () => {
      it('should have value home when home is selected', () => {
        cy.get('[data-cy="title-select"]').select('Home');
        cy.get('[data-cy="title-select"]').should('have.value', 'Home')
      })

      it('should display required when title is not selected', () => {
        cy.get('[data-cy="title-select"]').focus()
        cy.get('[data-cy="city-select"]').focus()
        cy.contains('Required').should('be.visible')
      })
    })


    context('City Field', () => {
      it('should have value Istanbul when Istanbul is selected', () => {
        cy.get('[data-cy="city-select"]').select('Istanbul');
        cy.gqlQuery({ type: 'counties' })
        cy.get('[data-cy="city-select"]').should('have.value', 'Istanbul')
      })
      it('should display required when city is not selected', () => {
        cy.get('[data-cy="city-select"]').focus()
        cy.get('[data-cy="title-select"]').focus()
        cy.contains('Required').should('be.visible')
      })
    })

    context('County Field', () => {
      it('should be disabled if city is not selected', () => {
        cy.get('[data-cy="county-select"]').should('be.disabled')
      })

      it('should have value Besiktas when Besiktas is selected', () => {
        cy.get('[data-cy="city-select"]').select('Istanbul');
        cy.gqlQuery({ type: 'counties' });
        cy.get('[data-cy="county-select"]').select('Besiktas');
        cy.gqlQuery({ type: 'districts' });
        cy.get('[data-cy="county-select"]').should('have.value', 'Besiktas')
      })

      it('should display required when county is not selected', () => {
        cy.get('[data-cy="city-select"]').select('Istanbul')
        cy.gqlQuery({ type: 'counties' });
        cy.get('[data-cy="county-select"]').select('');
        cy.get('[data-cy="address-input"]').focus()
        cy.contains('Required').should('be.visible')
      })
    })

    context('District Field', () => {
      it('should be disabled if city is not selected', () => {
        cy.get('[data-cy="district-select"]').should('be.disabled')
      })

      it('should be disabled if county is not selected', () => {
        cy.get('[data-cy="city-select"]').select('Istanbul')
        cy.gqlQuery({ type: 'counties' });
        cy.get('[data-cy="district-select"]').should('be.disabled')
      })


      it('should have value Bebek when Bebek is selected', () => {
        cy.get('[data-cy="city-select"]').select('Istanbul');
        cy.gqlQuery({ type: 'counties' });
        cy.get('[data-cy="county-select"]').select('Besiktas');
        cy.gqlQuery({ type: 'districts' });
        cy.get('[data-cy="district-select"]').select('Bebek')
        cy.get('[data-cy="district-select"]').should('have.value', 'Bebek')
      })

      it('should display required when district is not selected', () => {
        cy.get('[data-cy="city-select"]').select('Istanbul')
        cy.gqlQuery({ type: 'counties' });
        cy.get('[data-cy="county-select"]').select('Besiktas');
        cy.gqlQuery({ type: 'districts' });
        cy.get('[data-cy="district-select"]').select('');
        cy.get('[data-cy="address-input"]').focus()
        cy.contains('Required').should('be.visible')
      })
    })

    context('Address Field', () => {
      it('should have value what an awesome address when typed', () => {
        cy.get('[data-cy="address-input"]').type('what an awesome address');
        cy.get('[data-cy="address-input"]').should('have.value', 'what an awesome address')
      })

      it('should display required when address is empty', () => {
        cy.get('[data-cy="address-input"]').focus('')
        cy.get('[data-cy="floor-input"]').focus('')
        cy.contains('Required').should('be.visible')
      })
    })

    context('Floor Field', () => {
      it('should have value 2 when typed', () => {
        cy.get('[data-cy="floor-input"]').type('2');
        cy.get('[data-cy="floor-input"]').should('have.value', '2')
      })

      it('should display required when floor is empty', () => {
        cy.get('[data-cy="floor-input"]').focus('')
        cy.get('[data-cy="flat-input"]').focus('')
        cy.contains('Required').should('be.visible')
      })
    })

    context('Flat Field', () => {
      it('should have value 3 when typed', () => {
        cy.get('[data-cy="flat-input"]').type('3');
        cy.get('[data-cy="flat-input"]').should('have.value', '3')
      })

      it('should display required when flat is empty', () => {
        cy.get('[data-cy="flat-input"]').focus('')
        cy.get('[data-cy="floor-input"]').focus('')
        cy.contains('Required').should('be.visible')
      })
    })
  })

  context('Add a new address', () => {
    it('should add a new address when submit is clicked', () => {
      const variables = {
        address: 'This is a new address',
        city: 'Istanbul',
        county: 'Besiktas',
        district: 'Levent',
        flat: 3,
        floor: 1,
        title: 'home',
      };

      cy.gqlMutation({
        type: 'addAddress',
        opts: { isEmpty: false },
        variables
      })

      cy.gqlQuery({ type: 'myAddresses', opts: { isEmpty: false } });
      cy.gqlQuery({ type: 'cities' });
      cy.contains('Please select an address').click()
      cy.contains('Add an address').click()
      cy.get('[data-cy="title-select"]').select('Home')
      cy.get('[data-cy="city-select"]').select('Istanbul')
      cy.gqlQuery({ type: 'counties' });
      cy.get('[data-cy="county-select"]').select('Besiktas')
      cy.gqlQuery({ type: 'districts' });
      cy.get('[data-cy="district-select"]').select('Levent')
      cy.get('[data-cy="address-input"]').type('This is a new address')
      cy.get('[data-cy="floor-input"]').type('1')
      cy.get('[data-cy="flat-input"]').type('3')
      cy.get('[data-cy="new-address-save-btn"]').click()
      cy.contains('Add an address').should('be.visible')
      cy.contains('p', 'This is a new address').should('be.visible')
    })
  })

})