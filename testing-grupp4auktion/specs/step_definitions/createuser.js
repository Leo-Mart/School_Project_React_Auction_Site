import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('That the registration button is visible', () => {
  cy.visit('/');
  cy.get('.btn-bg-base-200').should('exist');
});

When('I click the Registrera button', () => {
  cy.get('.btn-bg-base-200').click();
});

Then('I should be redirected to the registrationform', () => {
  cy.url('should', '/register');
});

Given('That I am on the register page', () => {
  cy.visit('/register');
});

When('I fill in the form correctly', () => {
  cy.get('.my-5 > :nth-child(2)')
    .should('be.visible')
    .type('testmail@testmail.se');
  cy.get('.my-5 > :nth-child(4)').should('be.visible').type('John');
  cy.get('.my-5 > :nth-child(6)').should('be.visible').type('Doe');
  cy.get('.my-5 > :nth-child(8)').should('be.visible').type('123');
  cy.get('.my-5 > :nth-child(10)').should('be.visible').type('123');
});

When('I click the Skapa konto button', () => {
  cy.get('.my-5 > .rounded').click();
});

Then('An account will be created', () => {
  cy.get('.modal-box').should('be.visible');
  cy.get('.Toastify__toast-container').should('contain.text', 'Konto skapad!');
});
