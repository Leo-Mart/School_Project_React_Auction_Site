Feature: Favorite

    User should be able to favorite/unfavorite auctions and have them show up on their userpage

    Scenario: As a visitor I want to be able to get to the login modal

        Given the Logga in button is visible
        When I click on the Logga in button
        Then I will get the login modal

    Scenario: As a visitor I want to be able to login as a user

        Given That I am on the login modal
        When I type in an email and password in the input fields
        And I press the Logga in button at the bottom of the modal
        Then I will try to log in as that user

    Scenario: As a user I should be able to favorite an auction on the homepage

        Given That I am logged in
        And I am on the homepage
        And That there are auctions in the list
        When I click a heart button
        And The auction is not already a favorite
        Then The auction should become a favorite

    Scenario: As a user I should be able to favorite an auction from its specific page

        Given A user is logged in
        And I am on the specific auction page
        When I click the spara button
        And That auction is not already a favorite
        Then That auction should become a favorite

    Scenario: As a user I can see my favorite auctions on my userpage

        Given That the user is on their page
        And Has the mina favoriter tab open
        Then They should see their favorite auctions

    Scenario: As a user I can unfavorite auctions from the homepage

        Given A user is on the homepage and has atleast one auction as a favorite
        When I click the heart button
        And The auction is already favorite
        Then The auction should no longer be a favorite

    Scenario: As a user I can unfavorite auctions from a specific auction page

        Given That a user is on a specific auction page
        And That auction is a favorite
        When The user clicks the spara button
        Then That auction should be removed from the users favorites