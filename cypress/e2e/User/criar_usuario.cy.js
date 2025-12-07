describe("Criar e buscar usuário na PetStore", () => {
  const id = Date.now();
  const username = `user_${id}`;

  it("Deve criar um novo usuário com sucesso", () => {
    cy.request({
      method: "POST",
      url: "https://petstore.swagger.io/v2/user",
      body: {
        id: id,
        username: username,
        firstName: "Samyra",
        lastName: "Silva",
        email: "samyra@example.com",
        password: "123456",
        phone: "8299999999",
        userStatus: 1,
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
    });
  });

  it("Deve buscar o usuário criado", () => {
    cy.request({
      method: "GET",
      url: `https://petstore.swagger.io/v2/user/${username}`,
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.username).to.eq(username);
    });
  });
});
