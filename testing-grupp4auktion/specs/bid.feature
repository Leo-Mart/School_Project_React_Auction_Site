Feature: Bid on an auction

    As a user I want to be able to bid on an auction

    Scenario: As a visitor I want to be able to get to the login modal
        Given the Logga in button is visible
        When I click on the Logga in button
        Then I will get the login modal

    Scenario: As a visitor I want to be able to login as a user

        Given That I am on the login modal
        When I type in an email and password in the input fields
        And I press the Logga in button at the bottom of the modal
        Then I will try to log in as that user

    Scenario: As a user I want to be able to navigate to the correct place for placing a bid
        Given That I am currently logged in
        And I am on a specific auctionpage
        And The auction is not one that I have created
        When I click the lägg bud button
        Then The bidding modal should be visible

    Scenario: As a user I want to be able to place a bid on an auction
        Given That I can see the bidding modal
        When I enter a correct amount
        And Click the lägg bud button
        Then I should see some confirmation of my bid

    Scenario: As a user I want to be able to navigate to my userpage to see my active bids
        Given That User is logged in
        When I click mina sidor button
        And The aktiva bud tab
        Then I should see the auction that I previously bid on