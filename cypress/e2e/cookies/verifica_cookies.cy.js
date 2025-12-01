describe("Verificação de Cookies", () => {
  it("Analisando se a página possui cookies. Se existir irá ignorar.", () => {
    // Acessa o site
    cy.visit("https://petstore.swagger.io/");

    // Aguarda carregamento
    cy.wait(1000);

    // Busca todos os cookies existentes
    cy.getCookies().then((cookies) => {
      if (cookies.length > 0) {
        cy.log("Cookies encontrados, ignorando...");
        return;
      }

      cy.log("Nenhum cookie encontrado na página.");
    });
  });
});
