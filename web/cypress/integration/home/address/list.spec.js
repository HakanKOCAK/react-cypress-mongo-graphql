/// <reference types="cypress" />

describe('Address List', () => {
  beforeEach(() => {
    //Go to home
    cy.visit('/home');
  })

  it('should redirect to /login when authenticated user is not exists', () => {
    //Assume there is no authenticated user
    cy.intercept('http://localhost:4000/refresh_token', {
      body: { accessToken: '' }
    }).as('refreshToken');

    cy.intercept('POST', 'http://localhost:4000/graphql', {
      body: {
        data: {
          me: null
        }
      }
    }).as('gqlMeQuery');

    cy.url().should('include', '/login')
  })

  it('should display please select an address when there is an authenticated user', () => {
    //Assume there is an authenticated user
    cy.intercept('http://localhost:4000/refresh_token', {
      body: { accessToken: 'accessToken' }
    }).as('refreshToken');

    cy.intercept('POST', 'http://localhost:4000/graphql', {
      body: {
        data: {
          me: {
            id: 'randomId',
            email: 'random@mail.com',
            name: 'Hakan',
            surname: 'Kocak'
          },
          myAddresses: []
        }
      }
    }).as('gqlQueries');

    cy.contains('Please select an address').should('be.visible')
  })

  it('should display address details when there is pre saved address on localStorage', () => {
    localStorage.setItem('fooder.last.address', '0')
    //Assume there is an authenticated user
    cy.intercept('http://localhost:4000/refresh_token', {
      body: { accessToken: 'accessToken' }
    }).as('refreshToken');

    cy.intercept('POST', 'http://localhost:4000/graphql', {
      body: {
        data: {
          me: {
            id: 'randomId',
            email: 'random@mail.com',
            name: 'Hakan',
            surname: 'Kocak'
          },
          myAddresses: [
            {
              id: '0',
              address: 'Address on local storage',
              city: 'Istanbul',
              county: 'Besiktas',
              district: 'Bebek',
              flat: 2,
              floor: 3,
              title: 'home'
            }
          ]
        }
      }
    }).as('gqlQueries');

    cy.contains('HOME').should('be.visible')
  })

  it('should open address list when please select an address clicked', () => {
    //Assume there is an authenticated user
    cy.intercept('http://localhost:4000/refresh_token', {
      body: { accessToken: 'accessToken' }
    }).as('refreshToken');

    cy.intercept('POST', 'http://localhost:4000/graphql', {
      body: {
        data: {
          me: {
            id: 'randomId',
            email: 'random@mail.com',
            name: 'Hakan',
            surname: 'Kocak'
          },
          myAddresses: [
            {
              id: '0',
              address: 'Home adress',
              city: 'Istanbul',
              county: 'Besiktas',
              district: 'Bebek',
              flat: 2,
              floor: 3,
              title: 'home'
            },

            {
              id: '1',
              address: 'Other address',
              city: 'Ankara',
              county: 'Cankaya',
              district: 'Bilkent',
              flat: 2,
              floor: 3,
              title: 'other'
            }
          ],
          cities: ['Istanbul', 'Ankara', 'Izmir']
        }
      }
    }).as('gqlQueries');

    cy.contains('Please select an address').click()
    cy.contains('My Addresses').should('be.visible')
  })

  it('should close address list when close button clicked', () => {
    //Assume there is an authenticated user
    cy.intercept('http://localhost:4000/refresh_token', {
      body: { accessToken: 'accessToken' }
    }).as('refreshToken');

    cy.intercept('POST', 'http://localhost:4000/graphql', {
      body: {
        data: {
          me: {
            id: 'randomId',
            email: 'random@mail.com',
            name: 'Hakan',
            surname: 'Kocak'
          },
          myAddresses: [
            {
              id: '0',
              address: 'Home adress',
              city: 'Istanbul',
              county: 'Besiktas',
              district: 'Bebek',
              flat: 2,
              floor: 3,
              title: 'home'
            },

            {
              id: '1',
              address: 'Other address',
              city: 'Ankara',
              county: 'Cankaya',
              district: 'Bilkent',
              flat: 2,
              floor: 3,
              title: 'other'
            }
          ],
          cities: ['Istanbul', 'Ankara', 'Izmir']
        }
      }
    }).as('gqlQueries');

    cy.contains('Please select an address').click()
    cy.get('[data-cy="address-list-close-btn"]').click()
    cy.contains('Please select an address').should('be.visible')
  })

  it('should change background to teal to inform user that address is selected when clicked on an address', () => {
    //Assume there is an authenticated user
    cy.intercept('http://localhost:4000/refresh_token', {
      body: { accessToken: 'accessToken' }
    }).as('refreshToken');

    cy.intercept('POST', 'http://localhost:4000/graphql', {
      body: {
        data: {
          me: {
            id: 'randomId',
            email: 'random@mail.com',
            name: 'Hakan',
            surname: 'Kocak'
          },
          myAddresses: [
            {
              id: '0',
              address: 'Home adress',
              city: 'Istanbul',
              county: 'Besiktas',
              district: 'Bebek',
              flat: 2,
              floor: 3,
              title: 'home'
            },

            {
              id: '1',
              address: 'Other address',
              city: 'Ankara',
              county: 'Cankaya',
              district: 'Bilkent',
              flat: 2,
              floor: 3,
              title: 'other'
            }
          ],
          cities: ['Istanbul', 'Ankara', 'Izmir']
        }
      }
    }).as('gqlQueries');

    cy.contains('Please select an address').click()
    cy.get('[data-cy="address1"]').click().should('have.css', 'background-color', 'rgb(56, 178, 172)')
  })

  it('should open new address modal when add an address clicked', () => {
    //Assume there is an authenticated user
    cy.intercept('http://localhost:4000/refresh_token', {
      body: { accessToken: 'accessToken' }
    }).as('refreshToken');

    cy.intercept('POST', 'http://localhost:4000/graphql', {
      body: {
        data: {
          me: {
            id: 'randomId',
            email: 'random@mail.com',
            name: 'Hakan',
            surname: 'Kocak'
          },
          myAddresses: [
            {
              id: '0',
              address: 'Home adress',
              city: 'Istanbul',
              county: 'Besiktas',
              district: 'Bebek',
              flat: 2,
              floor: 3,
              title: 'home'
            },

            {
              id: '1',
              address: 'Other address',
              city: 'Ankara',
              county: 'Cankaya',
              district: 'Bilkent',
              flat: 2,
              floor: 3,
              title: 'other'
            }
          ],
          cities: ['Istanbul', 'Ankara', 'Izmir']
        }
      }
    }).as('gqlQueries');

    cy.contains('Please select an address').click()
    cy.contains('Add an address').click()
    cy.contains('New Address').should('be.visible')
  })

  it('should open delete modal when delete button of an address clicked', () => {
    //Assume there is an authenticated user
    cy.intercept('http://localhost:4000/refresh_token', {
      body: { accessToken: 'accessToken' }
    }).as('refreshToken');

    cy.intercept('POST', 'http://localhost:4000/graphql', {
      body: {
        data: {
          me: {
            id: 'randomId',
            email: 'random@mail.com',
            name: 'Hakan',
            surname: 'Kocak'
          },
          myAddresses: [
            {
              id: '0',
              address: 'Home adress',
              city: 'Istanbul',
              county: 'Besiktas',
              district: 'Bebek',
              flat: 2,
              floor: 3,
              title: 'home'
            },

            {
              id: '1',
              address: 'Other address',
              city: 'Ankara',
              county: 'Cankaya',
              district: 'Bilkent',
              flat: 2,
              floor: 3,
              title: 'other'
            }
          ],
          cities: ['Istanbul', 'Ankara', 'Izmir']
        }
      }
    }).as('gqlQueries');

    cy.contains('Please select an address').click()
    cy.get('[data-cy="delete-btn1"]').click()
    cy.contains('Delete Address').should('be.visible')
  })
})