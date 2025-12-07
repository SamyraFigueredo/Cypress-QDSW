describe("Criar usuário na PetStore", () => {
  it("Deve criar um novo usuário com sucesso", () => {
    cy.request({
      method: "POST",
      url: "https://petstore.swagger.io/v2/user",
      body: {
        id: 123,
        username: "SamyraMaria",
        firstName: "Samyra",
        lastName: "Silva",
        email: "maria@teste.com",
        password: "123456",
        phone: "8299999999",
        userStatus: 1,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("message");
    });
  });
});
