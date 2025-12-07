describe('Petstore Swagger - Interface de Usuário', () => {

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

  it('Deve testar o menu de esquemas (schemes) HTTP/HTTPS', () => {
    // Verifica seção de esquemas
    cy.get('.scheme-container').should('be.visible');

    cy.get('.scheme-container').within(() => {
      // Verifica que tem pelo menos um esquema
      cy.get('[class*="schemes"], select').should('exist');

      // Testa dropdown se existir
      cy.get('select').then(($select) => {
        if ($select.length > 0) {
          // Verifica opções
          cy.wrap($select).find('option').should('have.length.at.least', 1);

          // Seleciona diferentes opções
          cy.wrap($select).select('http');
          cy.wait(500);
          cy.wrap($select).select('https');
          cy.wait(500);
        }
      });

      // Testa botões de esquema se existirem
      cy.get('button').then(($btns) => {
        const schemeBtns = $btns.filter((i, btn) =>
          btn.textContent.includes('http') ||
          btn.getAttribute('class')?.includes('scheme')
        );

        if (schemeBtns.length > 0) {
          schemeBtns.each((i, btn) => {
            cy.wrap(btn).click();
            cy.wait(300);
          });
        }
      });
    });
  });

  it('Deve testar o esquema de autenticação', () => {
    // Clica no botão Authorize
    cy.get('.btn.authorize').click();

    // Verifica se o modal aparece
    cy.get('.dialog-ux').should('be.visible');

    // Verifica campos de autenticação
    cy.get('input[type="text"]').should('be.visible');

    // Fecha o modal
    cy.get('.close-modal').click();
    cy.get('.dialog-ux').should('not.exist');
  });

  it('Deve expandir um endpoint, ativar Try it out e executar (verifica botão Execute e painel de resposta)', () => {
    // Pega o primeiro opblock disponível
    cy.get('.opblock', { timeout: 10000 }).first().as('primeiroOpblock');

    // Expande o opblock (clica no summary)
    cy.get('@primeiroOpblock').within(() => {
      cy.get('.opblock-summary-control, .opblock-summary', { timeout: 5000 })
        .first()
        .click();
      // Verifica que o corpo do opblock ficou visível
      cy.get('.opblock-body, .opblock-section', { timeout: 5000 }).should('be.visible');

      // Tenta localizar e clicar no botão Try it out (pode ter variações de classe/texto)
      cy.get('button').then(($btns) => {
        const tryBtn = Array.from($btns).find(b =>
          /try it out/i.test(b.textContent) || b.className.includes('try-out')
        );
        if (tryBtn) {
          cy.wrap(tryBtn).click();
        } else {
          // se não encontrar, falha de forma explícita
          throw new Error('Botão "Try it out" não encontrado neste opblock');
        }
      });

      // Verifica que o botão Execute apareceu e está habilitado
      cy.get('button').then(($btns) => {
        const execBtn = Array.from($btns).find(b =>
          /execute/i.test(b.textContent) || b.className.includes('execute')
        );
        expect(execBtn, 'Botão Execute presente após Try it out').to.exist;
        cy.wrap(execBtn).should('not.be.disabled');

        // Clica em Execute e aguarda painel de resposta
        cy.wrap(execBtn).click();
      });
    });

    // Aguarda o painel de resposta aparecer e verifica presença de código/status
    cy.get('.responses-wrapper, .responses, .response', { timeout: 20000 }).should('be.visible');

    // Tenta validar que existe um status HTTP exibido (por exemplo 200)
    cy.get('.response, .responses').then(($resp) => {
      const text = $resp.text();
      const hasStatus = /200|201|204|default/i.test(text);
      expect(hasStatus).to.equal(true);
    });
  });

  it('Deve expandir e recolher todas as operações e abrir a seção de Models/Schemas', () => {
    // Tenta localizar botão de Expand All / Collapse All por texto
    cy.get('button', { timeout: 8000 }).then(($btns) => {
      const allBtns = Array.from($btns);
      const expandBtn = allBtns.find(b => /expand operations|expand all|expand/i.test(b.textContent));
      const collapseBtn = allBtns.find(b => /collapse operations|collapse all|collapse/i.test(b.textContent));

      if (expandBtn) {
        cy.wrap(expandBtn).click();
        // Depois de expandir, ao menos um opblock-body deve estar visível
        cy.get('.opblock-body, .opblock-section', { timeout: 8000 }).should('be.visible');
      }

      if (collapseBtn) {
        cy.wrap(collapseBtn).click();
        // Após recolher, nenhum opblock-body visível (ou ao menos não todos)
        cy.get('.opblock-body, .opblock-section').should('not.be.visible');
      }
    });

    // Tentar abrir seção de Models/Schemas (variações de texto)
    cy.get('a, button, .tab, .model-toggle', { timeout: 8000 }).then(($els) => {
      const arr = Array.from($els);
      const modelsEl = arr.find(e => /models|schemas|definitions/i.test(e.textContent));
      if (modelsEl) {
        cy.wrap(modelsEl).click({ force: true });
        // Seletores típicos para painel de modelos/schemas
        cy.get('.models, .model-container, .schema-container, .definitions', { timeout: 8000 })
          .should('be.visible');
      } else {
        // se não existir, apenas registra que a seção não foi encontrada (não quebra)
        cy.log('Seção Models/Schemas não encontrada nesta versão do Swagger UI');
      }
    });
  });
});