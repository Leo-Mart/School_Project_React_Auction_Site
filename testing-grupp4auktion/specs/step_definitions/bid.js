import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// This test fails and crashes the backend, presumably something we are doing wrong with cypress and the network request?

Given('That I am currently logged in', () => {
  cy.get('.flex.flex-col > .btn-warning').should('contain.text', 'Mina sidor');
});

Given('I am on a specific auctionpage', () => {
  cy.get('.grid-cols-6').children().first().click();
});

Given('The auction is not one that I have created', () => {
  cy.get('.gap-2 > .btn-primary').should('not.be.disabled');
});

When('I click the lägg bud button', () => {
  cy.get('.gap-2 > .btn-primary').click();
});

Then('The bidding modal should be visible', () => {
  cy.get('#bidding-modal > .modal-box').should('be.visible');
});

Given('That I can see the bidding modal', () => {
  cy.get('#bidding-modal > .modal-box').should('be.visible');
  cy.wait(2000);
});

When('I enter a correct amount', () => {
  cy.get('#bidding-modal > .modal-box > :nth-child(2)').type(546);
  cy.wait(2000);

  //   let count = 521;

  // const getNumber = (() => {
  //   return () => ++count;
  // })();
  //   cy.wrap({ number: getNumber })
  //     .invoke('number')
  //     .then((number) => {
  //       const someNum = number;
  //       cy.log(someNum);
  //       cy.get('#bidding-modal > .modal-box > :nth-child(2)').type(someNum);
  //     });
});

When('Click the lägg bud button', () => {
  cy.get(
    '#bidding-modal > .modal-box > .modal-action > form > .btn-warning'
  ).click();
  cy.wait(2000);
  // for some reason the backend crashes here when cypress tries to bid on an auction.
  // Seems like the PATCH request towards the user is failing, when trying to push the id of the auction into the users activeBids array. FOr whatever reason. Seems to be the exact same issue as with the favorite functionality
});

Then('I should see some confirmation of my bid', () => {
  cy.wait(2000);
  cy.get('.Toastify__toast-container').should(
    'contain.text',
    'Du har budat succesfully'
  );
});

Given('That User is logged in', () => {
  // TODO: implement step
});

When('I click mina sidor button', () => {
  // TODO: implement step
});

When('The aktiva bud tab', () => {
  // TODO: implement step
});

Then('I should see the auction that I previously bid on', () => {
  // TODO: implement step
});
