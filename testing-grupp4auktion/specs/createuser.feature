Feature: Create a new user

    Should allow a visitor to the site to create a new user/login

    Scenario: As a visitor I want to be able to navigate to the registrationform
        Given That the registration button is visible
        When I click the Registrera button
        Then I should be redirected to the registrationform

    Scenario: As a visitor I want to be able to create an account
        Given That I am on the register page
        When I fill in the form correctly
        And I click the Skapa konto button
        Then An account will be created


