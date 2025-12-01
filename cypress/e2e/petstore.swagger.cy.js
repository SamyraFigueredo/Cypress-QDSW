describe('Pagina inicial so site', () => {
  it('Acessa o site', () => {
    cy.visit('https://petstore.swagger.io/')

    // Vai verificar se esta no domínio correto
    cy.url().should('include', 'petstore.swagger.io')
  })
})