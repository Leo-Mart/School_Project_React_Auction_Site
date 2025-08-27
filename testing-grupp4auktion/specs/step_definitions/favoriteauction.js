import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// This test fails and crashes the backend, presumably something we are doing wrong with cypress and the network request?

Given('That I am logged in', () => {
  cy.get('.flex.flex-col > .btn-error').should('exist');
});

Given('I am on the homepage', () => {
  cy.url().should('eq', 'http://localhost:5173/');
});

Given('That there are auctions in the list', () => {
  cy.get('.grid-cols-6').children().should('exist');
});

When('I click a heart button', () => {
  cy.wait(10000);
  cy.get(
    '[href="/auction/662a0aae5d27e85ef1b9b4fd"] > .card > .card-body > .card-actions > div'
  ).click();
});

When('The auction is not already a favorite', () => {
  // TODO: implement step
});

Then('The auction should become a favorite', () => {
  // TODO: implement step
});

Given('A user is logged in', () => {
  // TODO: implement step
});

Given('I am on the specific auction page', () => {
  // TODO: implement step
});

When('I click the spara button', () => {
  // TODO: implement step
});

When('That auction is not already a favorite', () => {
  // TODO: implement step
});

Then('That auction should become a favorite', () => {
  // TODO: implement step
});

Given('That the user is on their page', () => {
  // TODO: implement step
});

Given('Has the mina favoriter tab open', () => {
  // TODO: implement step
});

Then('They should see their favorite auctions', () => {
  // TODO: implement step
});

Given(
  'A user is on the homepage and has atleast one auction as a favorite',
  () => {
    // TODO: implement step
  }
);

When('I click the heart button', () => {
  // TODO: implement step
});

When('The auction is already favorite', () => {
  // TODO: implement step
});

Then('The auction should no longer be a favorite', () => {
  // TODO: implement step
});

Given('That a user is on a specific auction page', () => {
  // TODO: implement step
});

Given('That auction is a favorite', () => {
  // TODO: implement step
});

When('The user clicks the spara button', () => {
  // TODO: implement step
});

Then('That auction should be removed from the users favorites', () => {
  // TODO: implement step
});
