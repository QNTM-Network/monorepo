describe('Creating a quant', () => {
  it('Displays the quant in the list', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-testid="quantText"]')
      .type('New Quant');

    cy.get('[data-testid="sendButton"]')
      .click();

    cy.get('[data-testid="quantText"]')
      .should('have.value', '');

    cy.contains('New Quant');
  });
});
