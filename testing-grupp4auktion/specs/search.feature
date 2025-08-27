Feature: Search brands
    As a user I want to be able to search for auctions on the site

    Scenario Outline: Search brands
        Given I can see the search-bar
        When I click the search-field
        And I search for "<searchTerm>"
        Then I get search results containing "<searchTerm>"

        Examples:
            | searchTerm |
            | nes        |
            | atari      |
            | xbox       |

    Scenario: When I click the search result I expect to see the relevant auction
        Given I have a search result containing "xbox"
        When I click on the result
        Then I should be redirected to the correct auction page
