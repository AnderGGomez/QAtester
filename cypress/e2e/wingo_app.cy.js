describe('Wingo app', () => {

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

  it('Es posible seleccionar la opcion mas economica', ()=>{

    //Given
    cy.visit('https://booking.wingo.com/es/search/BOG/CLO/2023-04-15/2023-05-19/2/0/0/0/COP/0/0/COP/multicurrency')
    cy.request("https://gum.criteo.com/sid/json?origin=onetag&domain=wingo.com&sn=ChromeSyncframe&so=0&topUrl=booking.wingo.com&cw=1&lsw=1&topicsavail=0&fledgeavail=0")
    
    //When
    cy.get('[class="wingo-button btn-purple-white btn-block m-0 ng-star-inserted"]',{timeout: 10000}).eq(0).click()
    cy.get('[class="wingo-button btn-purple-white btn-block m-0 ng-star-inserted"]').eq(2).click()

    cy.get('[class="price"]').should('have.text','$576,000COP')
    cy.get('button[class="btn-continuar"]').contains('Continuar').click()

    //Datos de contacto pasajero 1
    cy.get('[id="name-1-1"]',{timeout:10000}).type('Anderson') 
    cy.get('[id="lastname-1-1"]').type('Gomez Gomez')
    cy.get('[class="styledSelect"]').first().click()
    cy.get('li[rel="m"]').first().click()

    cy.get('[id="1-birthday-0"]').find('select').first().select('1996')
    cy.get('[id="1-birthday-0"]').find('select').first().next().select('Abr')
    cy.get('[id="1-birthday-0"]').find('select').first().next().next().select('18',{force:true})
    
    cy.get('[id="email-1-1"]').type("anderson.user@gmail.com")
    cy.get('[id="email-confirm-1-1"]').type("anderson.user@gmail.com")
    cy.get('[id="phone-1-1"]').type("3115144978")
    cy.get('[id="numero-1-1"]').type("10187154")

    //Datos de contacto pasajero 2
    cy.get('[id="name-1-2"]').type('Santiago') 
    cy.get('[id="lastname-1-2"]').type('Gomez Zapata')
    cy.get('[class="styledSelect"]').last().click()
    cy.get('li[rel="m"]').last().click()

    cy.get('[id="1-birthday-1"]').find('select').first().select('1963')
    cy.get('[id="1-birthday-1"]').find('select').first().first().next().select('May')
    cy.get('[id="1-birthday-1"]').find('select').first().next().next().select('7',{force:true})

    cy.get('[id="numero-1-2"]').type("10196258")

  })
})
