Feature: Order service API validation (Karate)

  # Run with the Karate standalone JAR (requires Java 11+):
  #   java -jar karate.jar order-api.feature
  # Same assertions as tests/api/order-api.spec.ts, in Karate's Gherkin DSL.

  Background:
    * url 'https://jsonplaceholder.typicode.com'

  Scenario: Get a single order returns 200 with the expected contract
    Given path 'posts', 1
    When method get
    Then status 200
    And match response == { userId: 1, id: 1, title: '#string', body: '#string' }

  Scenario: Create an order echoes the payload with 201
    Given path 'posts'
    And request { userId: 1, title: 'Sauce Labs Backpack', body: 'qty: 2' }
    When method post
    Then status 201
    And match response contains { userId: 1, title: 'Sauce Labs Backpack' }
    And match response.id == '#number'

  Scenario: Unknown resource returns 404
    Given path 'posts', 999999
    When method get
    Then status 404
