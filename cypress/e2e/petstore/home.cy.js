describe('Petstore Swagger - Página Inicial', () => {
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

  it('Deve carregar a página corretamente', () => {
    cy.title().should('contain', 'Swagger UI');
    cy.get('.swagger-ui').should('be.visible');
    cy.contains('Swagger Petstore').should('be.visible');
  });

  it('Deve exibir os endpoints da API', () => {
    cy.contains('pet', { timeout: 10000 }).should('be.visible');
    cy.contains('store').should('be.visible');
    cy.contains('user').should('be.visible');
    
    cy.get('#operations-pet-addPet')
      .scrollIntoView()
      .should('be.visible')
      .click();
    
    cy.contains('Add a new pet to the store', { timeout: 5000 }).should('be.visible');
  });

  it('Deve testar a funcionalidade de Authorize', () => {
    // Clica no botão Authorize global
    cy.get('.btn.authorize').should('be.visible').click();
    
    cy.wait(1000);
    
    // Verifica se o modal de autorização abriu
    cy.get('.dialog-ux').should('be.visible');
    
    // Verifica campos no modal
    cy.get('.dialog-ux').within(() => {
      cy.contains('Available authorizations').should('be.visible');
      cy.get('input[type="text"]').should('be.visible');
      cy.get('button').contains('Authorize').should('be.visible');
      cy.get('button').contains('Close').should('be.visible');
    });
    
    // Fecha o modal
    cy.get('.dialog-ux .close-modal').click();
    cy.wait(500);
    
    // Verifica que o modal fechou
    cy.get('.dialog-ux').should('not.exist');
  });

  it('Deve testar responsividade e layout', () => {
    // Verifica elementos estruturais
    cy.get('#swagger-ui').should('exist');
    cy.get('.swagger-ui').should('have.css', 'display', 'block');
    
    // Verifica cabeçalho
    cy.get('.swagger-ui .scheme-container').should('be.visible');
    
    // Verifica seção principal
    cy.get('.swagger-ui .wrapper').should('exist');
    
    // Testa em diferentes tamanhos de viewport (simulado)
    cy.viewport(768, 1024); // Tablet
    cy.get('.swagger-ui').should('be.visible');
    
    cy.viewport(375, 667); // Mobile
    cy.get('.swagger-ui').should('be.visible');
    
    // Volta ao tamanho original
    cy.viewport(1920, 1080);
  });

  it('Deve validar estrutura de um endpoint específico', () => {
    // Expande um endpoint específico
    cy.get('#operations-pet-getPetById').click();
    cy.wait(1000);
    
    // Verifica estrutura do endpoint expandido
    cy.get('#operations-pet-getPetById.is-open').within(() => {
      // Verifica método HTTP
      cy.get('.opblock-summary-method').should('contain', 'GET');
      
      // Verifica path
      cy.get('.opblock-summary-path').should('contain', '/pet/{petId}');
      
      // Verifica descrição
      cy.get('.opblock-summary-description').should('contain', 'Find pet by ID');
      
      // Verifica parâmetros
      cy.get('.parameters-container').should('be.visible');
      
      // Verifica responses
      cy.get('.responses-inner').should('be.visible');
      cy.get('.response-col_status').should('contain', '200');
      cy.get('.response-col_description').should('contain', 'successful operation');
    });
  });

  it('Deve testar interação com exemplos de código', () => {
    // Expande um endpoint
    cy.get('#operations-store-placeOrder').click();
    cy.wait(1000);
    
    // Clica para ver exemplos de código
    cy.get('#operations-store-placeOrder').within(() => {
      cy.get('.responses-inner').within(() => {
        // Procura por tabs de linguagem (Curl, JavaScript, etc)
        cy.get('.tab').each(($tab) => {
          const language = $tab.text().trim();
          if (language && language !== '') {
            cy.wrap($tab).click();
            cy.wait(300);
            
            // Verifica se o código apareceu
            cy.get('pre').should('be.visible');
          }
        });
      });
    });
  });
});