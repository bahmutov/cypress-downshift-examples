/// <reference types="cypress" />

describe('downshift', () => {
  it('selects grape', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win, 'alert').as('alert')
      },
    })
    cy.get('#downshift-0-input').type('ap')
    cy.get('#downshift-0-menu li').should('have.length', 2)
    cy.contains('#downshift-0-menu li', 'grape').click()
    cy.get('@alert').should('have.been.calledWith', 'You selected grape')
    cy.get('#downshift-0-input').should('have.value', 'grape')
  })

  it('selects grape by using down arrow key', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win, 'alert').as('alert')
      },
    })
    cy.get('#downshift-0-input').type('{downArrow}')
    cy.get('#downshift-0-menu li')
      .should('have.length.gt', 2)
      .first()
      .should('contain', 'apple')
      .and('have.attr', 'aria-selected', 'true')
    cy.get('#downshift-0-input').type('{downArrow}{downArrow}{downArrow}')
    cy.contains('#downshift-0-menu li[aria-selected=true]', 'grape')
    cy.get('#downshift-0-input').type('{enter}')
    cy.get('@alert').should('have.been.calledWith', 'You selected grape')
  })
})
