Feature: User places order


@sandy
Scenario: Place order feature

Given  user is on Login page 
When   user enters login details with out random
Then   user clicks product to cart
When   user enter billing details
Then   user verify the order details