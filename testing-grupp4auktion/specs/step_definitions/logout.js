import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('That I am logged in as a user', () => {
  cy.get('.flex.flex-col > .btn-warning').should('be.visible');
  cy.get('.flex.flex-col > .btn-error').should('be.visible');
});

When('I click on the logout button', () => {
  cy.wait(2000);
  cy.get('.flex.flex-col > .btn-error').click();
});

Then('I will be logged out', () => {
  cy.get('.flex.flex-col > button.btn').should('contain.text', 'Logga in');
});
