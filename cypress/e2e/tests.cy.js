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
    cy.get(selectors.movies).should("have.length", 1)
    cy.get(selectors.movie_title).should('have.text','Терминатор-заржавел')
  })
  it('Seats ordering', () => {
    cy.get(selectors.day_navigation).eq(3).click()
    cy.get(selectors.movies).eq(0).contains('10:00').click()
    cy.get(selectors.seat1).click()
    cy.get(selectors.seat2).click()
    cy.get(selectors.accept_button).should('have.css', 'background-color').and('equal', 'rgb(22, 166, 175)')
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




  
  
