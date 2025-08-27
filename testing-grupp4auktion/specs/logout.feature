Feature: Log out from user

    Log out from the logged in user on the site

    Scenario: As a visitor I want to be able to get to the login modal
        Given the Logga in button is visible
        When I click on the Logga in button
        Then I will get the login modal

    Scenario: As a visitor I want to be able to login as a user

        Given That I am on the login modal
        When I type in an email and password in the input fields
        And I press the Logga in button at the bottom of the modal
        Then I will try to log in as that user

    Scenario: As a user I want to log out from the site so I become a visitor
        Given That I am logged in as a user
        When I click on the logout button
        Then I will be logged out