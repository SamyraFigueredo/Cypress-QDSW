describe('Petstore Swagger - Testes de API', () => {
  const handleCookieBanner = () => {
    cy.get('body').then(($body) => {
      if ($body.find('.ch2-container').length > 0) {
        cy.get('.ch2-btn.ch2-allow-all-btn.ch2-btn-primary', { timeout: 5000 })
          .click({ force: true });
        cy.wait(1500);
      }
    });
  };

  beforeEach(() => {
    cy.visit('/');
    cy.wait(3000);
    
    handleCookieBanner();
    
    cy.get('.swagger-ui', { timeout: 15000 }).should('be.visible');
  });

  const petId = Math.floor(Math.random() * 1000);
  const testPet = {
    id: petId,
    category: { id: 1, name: "Dogs" },
    name: "Rex",
    photoUrls: ["https://example.com/dog.jpg"],
    tags: [{ id: 1, name: "friendly" }],
    status: "available"
  };

  it('Deve adicionar um novo pet via API', () => {
    cy.request({
      method: 'POST',
      url: 'https://petstore.swagger.io/v2/pet',
      body: testPet,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', petId);
      expect(response.body).to.have.property('name', 'Rex');
    });
  });

  it('Deve buscar o pet criado', () => {
    cy.request(`https://petstore.swagger.io/v2/pet/${petId}`)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', petId);
      });
  });

  it('Deve atualizar o pet', () => {
    const updatedPet = { ...testPet, name: "Rex Atualizado" };
    
    cy.request({
      method: 'PUT',
      url: 'https://petstore.swagger.io/v2/pet',
      body: updatedPet
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('name', 'Rex Atualizado');
    });
  });

  it('Deve deletar o pet', () => {
    cy.request({
      method: 'DELETE',
      url: `https://petstore.swagger.io/v2/pet/${petId}`
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});