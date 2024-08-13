describe('Etapa de checkout', () => {
  it('Abre o app', () => {
    cy.visit('/')
  })

  it('Verifica se a página carregou corretamente', () => {
    cy.get('body').should('be.visible')
    cy.get('.v-sheet').should( 'be.visible')
    cy.get(':nth-child(2) > .rounded-xl').should('be.visible')
  })

  it('Preenche formulário com dados pessoais', () => {
    cy.get('#input-5').type("João")
    cy.get('#input-9').type("12991546255")
  })

  it('Avança para a entrega', () => {
    cy.get('.v-btn--variant-tonal').click()
  })

  it('Preenche formulário de entrega', () => {
    cy.get('#input-18').type('12650150')
    cy.get('#input-20').type('R Aleatoria')
    cy.get('#input-22').type('44')
    cy.get('#input-24').type('Cidade aleatoria')
    cy.get('#input-26').type('SP')
  })
  
  it('Avança para o pagamento', () => {
    cy.get('.v-btn--variant-tonal').click()
  })

  it('Preenche formulário para o pagamento', () => {
    cy.get('#input-33').click()
    cy.get('#input-34').type('Joao Luiz')
    cy.get('#input-36').type('4444 4444 4444 4444')
    cy.get('#input-38').type('1223')
    cy.get('#input-40').type('222')
    cy.get('#input-42').type('44500612725')
  })

  it('Adiciona mais um item', () => {
    cy.get('.mdi-plus').click()
  })

  it('Verifica se está aparecendo o valor total', () => {
    cy.get('.v-card-item').should('be.visible')
    cy.get('.text-h3').should('be.visible')
  })

  it('Finaliza a compra', () => {
    cy.get('.v-btn--variant-tonal').click()
  })

  
  it('Verifica se carregou a pagina de compra finalizada', () => {
    cy.wait(6000)
    cy.get('.v-card > .v-container').should('be.visible')
    cy.get('.mdi-check-circle-outline').should('be.visible')
  })
})