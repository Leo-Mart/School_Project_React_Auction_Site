Feature: Buyout and auction

    As a user I want to be able to buyout an auction that has piqued my interest

    Scenario: As a visitor I want to be able to get to the login modal
        Given the Logga in button is visible
        When I click on the Logga in button
        Then I will get the login modal

    Scenario: As a visitor I want to be able to login as a user

        Given That I am on the login modal
        When I type in an email and password in the input fields
        And I press the Logga in button at the bottom of the modal
        Then I will try to log in as that user

    Scenario: As a user I want to be able to navigate to the correct place for buying an auction
        Given That I am currently logged in
        And I am on a specific auctionpage
        And The auction is not one that I have created
        When I click the köp nu button
        Then Then I should be redirected to the stripe page

    Scenario: As a user I want to be able to enter my payment information and get redirected to the correct page
        Given I am on the stripe checkoutpage
        When I enter my paymentinfo
        And I click the pay button
        Then I should be redirected back to the mainpage and see a toast confirmation