Feature: Users routes

    Scenario: i'm a user that register successfully
        Given my user name is "testUser" and my password "securePassword"
        When I register an account
        Then my account is created

    Scenario: i'm a user that register on an account that already exists
        Given my user name is "testUser" and my password "V3rylongBadP@sswordsnifSNIF"
        When I register an account that already exists
        Then the account can't be created
