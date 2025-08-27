Feature: Create auctions

    Create an auction as a user

    Scenario: As a visitor I want to be able to get to the login modal
        Given the Logga in button is visible
        When I click on the Logga in button
        Then I will get the login modal

    Scenario: As a visitor I want to be able to login as a user

        Given That I am on the login modal
        When I type in an email and password in the input fields
        And I press the Logga in button at the bottom of the modal
        Then I will try to log in as that user

    Scenario: As a user I want to be able to navigate to the page for creating auctions
        Given I am logged in
        And I am on the userpage
        When I click on the Skapa annons button
        Then I will see the create auctions form

    Scenario: As a user I want to be able to create an auction
        Given I see the create auction form
        When I fill in the form
        And The information is correctly
        And I click on the second Skapa annons button
        Then I create a new auction

