import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('the Logga in button is visible', () => {
  cy.visit('/');
  cy.get('.flex.flex-col > button.btn').should('contain.text', 'Logga in');
});

When('I click on the Logga in button', () => {
  cy.get('.flex.flex-col > button.btn').click();
});

Then('I will get the login modal', () => {
  cy.get('.modal-box').should('be.visible');
});

Given('That I am on the login modal', () => {
  cy.get('.modal-box').should('be.visible');
});

When('I type in an email and password in the input fields', () => {
  cy.get('.my-4').should('be.visible').type('testmail@testmail.se');
  cy.get('[type="password"]').should('be.visible').type('123');
});

When('I press the Logga in button at the bottom of the modal', () => {
  cy.get('.modal-action > :nth-child(1) > .btn').click();
});

Then('I will try to log in as that user', () => {
  cy.get('.Toastify__toast-container').should('contain.text', 'Loggat in som ');
  cy.wait(1000);
});
