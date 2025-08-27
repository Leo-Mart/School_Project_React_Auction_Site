Feature: Failed buyout
    As a visitor I should not be able to buyout an auction

    Scenario: As a visitor I want to be able to navigate to the correct place for buying an auction
        Given As a visitor I am on the homepage
        When I navigate to a specific auctionpage
        And I click on the köp nu button
        Then I should get confirmation that I need to be logged in to perform such an action

