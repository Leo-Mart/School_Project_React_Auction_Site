import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// This test fails and doesn't load in the stripe page

When('I click the köp nu button', () => {
  cy.get('.btn-outline').click();
});

Then('Then I should be redirected to the stripe page', () => {
  // TODO: implement step
});

Given('I am on the stripe checkoutpage', () => {
  // TODO: implement step
});

When('I enter my paymentinfo', () => {
  // TODO: implement step
});

When('I click the pay button', () => {
  // TODO: implement step
});

Then(
  'I should be redirected back to the mainpage and see a toast confirmation',
  () => {
    // TODO: implement step
  }
);
