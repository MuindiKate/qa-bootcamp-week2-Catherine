Feature: Choose how many of a product to add to the cart

  Shoppers can add between 1 and 99 of a product to their cart.
  Any other amount is rejected with a clear message.

  Background:
    Given the shopper is looking at a product page
    And their cart is empty

  Scenario: The quantity can't go below 1
    When the shopper tries to lower the quantity below 1
    Then the quantity stays at 1
    And adding to the cart puts 1 item in the cart

  Scenario: The largest allowed quantity is accepted
    When the shopper enters a quantity of 99
    And adds the product to the cart
    Then the cart shows 99 of that product

  Scenario: A quantity above the limit is rejected
    When the shopper enters a quantity of 100
    Then they see the message "Please enter a quantity between 1 and 99."
    And nothing is added to the cart

  Scenario Outline: Invalid quantities are rejected
    When the shopper enters a quantity of <quantity>
    And tries to add the product to the cart
    Then they see the message "Please enter a quantity between 1 and 99."
    And nothing is added to the cart

    Examples:
      | quantity |
      | 0        |
      | -1       |
      | 1.5      |
      | abc      |