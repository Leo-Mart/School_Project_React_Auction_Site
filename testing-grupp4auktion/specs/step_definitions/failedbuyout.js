import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('As a visitor I am on the homepage', () => {
  cy.visit('/');
});

When('I navigate to a specific auctionpage', () => {
  cy.get('.grid-cols-6').children().first().click();
});

When('I click on the köp nu button', () => {
  cy.get('.btn-outline').click();
});

Then(
  'I should get confirmation that I need to be logged in to perform such an action',
  () => {
    cy.get('.Toastify__toast-container').should(
      'contain.text',
      'Du måste vara inloggad'
    );
  }
);
