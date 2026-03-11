Feature: User Account Management

Scenario: Register and Login

Given  user is on registeration page 
When   user enters registeration details
Then   verify account created or not
Then   user clicked on logout
When  user is on Login page 
Then   user enters login details 
Then   user clicked on logout
Then  user is on registeration page