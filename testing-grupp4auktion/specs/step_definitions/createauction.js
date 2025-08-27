import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I am logged in', () => {
  cy.get('.flex.flex-col > .btn-warning').should('contain.text', 'Mina sidor');
});

Given('I am on the userpage', () => {
  cy.get('.flex.flex-col > .btn-warning')
    .should('contain.text', 'Mina sidor')
    .click();
});

When('I click on the Skapa annons button', () => {
  cy.get('.flex-col > :nth-child(3) > .flex > :nth-child(4)').click();
});

Then('I will see the create auctions form', () => {
  cy.get('.card-body').should('be.visible');
});

/* New scenario - create auction */

Given('I see the create auction form', () => {
  cy.get('.card-body').should('be.visible');
});

When('I fill in the form', () => {
  cy.get('.card-body').should('be.visible');
});

When('The information is correctly', () => {
  cy.get(':nth-child(2) > .select').select('nintendo');
  cy.get(':nth-child(3) > .select').select('konsol');
  cy.get(':nth-child(4) > .input').type('Nintendo Entertainment System');
  cy.get(':nth-child(5) > .input').type(
    'En beskrivning på ett antal tecken kommer här'
  );

  cy.get('.file-input').type(
    'https://upload.wikimedia.org/wikipedia/commons/b/b2/NES-Console-Set.png'
  );
  cy.get(':nth-child(8) > .input').type('250');
  cy.get('.checkbox').click();
  cy.get(':nth-child(10) > .input').should('be.visible').type('500');
  cy.get(':nth-child(11) > .input').type('2024-05-05T10:00');
  cy.get(':nth-child(12) > .select').select('3');
});

When('I click on the second Skapa annons button', () => {
  cy.get('.card-body > .btn').should('be.visible').click();
});

Then('I create a new auction', () => {
  cy.wait(500);
  cy.get('.min-h-screen > :nth-child(3) > .grid')
    .children()
    .last()
    .should('contain.text', 'En beskrivning på ett antal tecken kommer här');
});
