import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I can see the search-bar', () => {
  cy.visit('/');
  cy.get('.search-bar-container > .input').should('exist');
});

When('I click the search-field', () => {
  cy.get('.input > input').should('exist').click();
});

When('I search for {string}', (searchString) => {
  cy.get('.input > input').should('exist').type(searchString);
});

Then('I get search results containing {string}', (searchString) => {
  // cy.get('.container').should('contain', searchString);
  cy.wait(500);
  cy.get('.container').each(($el) => {
    let text = cy.wrap($el.text().toLowerCase());
    text.should('contain', searchString.toLowerCase());
  });
});

Given('I have a search result containing {string}', (a) => {
  cy.get('.container').each(($el) => {
    let text = cy.wrap($el.text().toLowerCase());
    text.should('contain', a.toLowerCase());
  });
});

When('I click on the result', () => {
  cy.get('.cursor-pointer').click();
  cy.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
});

Then('I should be redirected to the correct auction page', () => {
  cy.get('.text-3xl').should('contain', 'Xbox');
});
