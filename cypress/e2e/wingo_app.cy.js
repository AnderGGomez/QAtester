describe('Wingo app', () => {
  it('La pagina de la aplicación puede ser abierta', () => {
    cy.visit('https://www.wingo.com/')
    cy.contains('Wingo')
  })

  it('Es posible buscar un vuelo de ida y vuelta',()=>{
    //given
    cy.visit('https://www.wingo.com/')

    //whent
    cy.get('[class="info-airport info-airport-origen"]').click()
    cy.get('ul li[data-cod="BOG"]').click()

    cy.get('[class="info-airport info-airport-destino"]').click()
    cy.get('ul li[data-cod="CLO"]').last().click()

    cy.get('[class="info-airport info-airport-ibe-pasajeros"]').click()
    cy.get('div[class="plus"]').first().click()

    cy.get('div[class=" info-airport info-airport-ida"]').click()
    cy.get('table.month1').contains('15').click()
    cy.get('table.month2').last().contains('19').click()

    //Then

    cy.get('div[class=" styledSelect styledSelectOrigen"]').should('have.text','Bogotá (BOG) El Dorado')
    cy.get('div[class="styledSelect styledSelectDestino"]').should('have.text', 'Cali (CLO) Alfonso Bonilla Aragón')

    cy.get('span[class="info-select info-select-start"]').should('have.text','15/04/2023')
    cy.get('span[class="info-select info-select-end"]').should('have.text','19/05/2023')

    cy.get('#tPasajeros').should('have.text','2 Pasajeros')

  })
})
