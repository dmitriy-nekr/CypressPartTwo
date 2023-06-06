import selectors from "../fixtures/selectors.json"
import inputData1 from "../fixtures/input_data1.json"
import inputData2 from "../fixtures/input_data2.json"
describe('Tests', () => {
  beforeEach(() => {
    cy.visit('/client')
  })
  it('start page', () => {
    cy.get(selectors.title).should((el) =>{
      expect(el).to.contain('Идёмвкино')
    })
    cy.get(selectors.day_navigation).should("have.length", 7)
    cy.get(selectors.movies).should("have.length", 3)
  })
})
describe('Seats ordering', () =>{
  it('Should seats ordering', () => {
    cy.visit('/admin')
    cy.login(inputData1.data.login, inputData1.data.password)
    cy.get(selectors.terminator_title).then(($el) => {
    const text = $el.text()
    cy.wrap(text).as('text')
    })
    cy.visit('/client')
    cy.get(selectors.day_navigation).eq(3).click()
    cy.get(selectors.movie_title).then((title)=>{
      if(title = '@text'){
        cy.contains('10:00').click()
        cy.get(selectors.seat1).click()
        cy.get(selectors.seat2).click()
        cy.get(selectors.accept_button).should('have.css', 'background-color').and('equal', 'rgb(22, 166, 175)')
      }
    })
})
})

describe('Admin auth tests',() =>{
  beforeEach(() => {
    cy.visit('/admin')
  })
  it('Admin auth success',()=>{
    cy.login(inputData1.data.login, inputData1.data.password)
    cy.get(selectors.subtitle).should('have.text','Администраторррская')
    })
  
  inputData2.forEach((el)=>{
   it('Admin auth fail',()=>{
      cy.login(el.login, el.password)
      cy.get(selectors.body).should((error)=>{
        expect(error).to.contain('Ошибка авторизации!')
      })
    })
  })
})




  
  
