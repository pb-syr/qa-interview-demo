# Retail Checkout QA Automation Demo

A complete QA automation project for a modern retail checkout flow. It covers UI automation with the Page Object Model, data driven scenarios, REST API contract testing, service virtualization for failure paths, AI assisted test design with human curation, defect triage backed by trace evidence, and CI that publishes rich reports on every push.

Stack: Playwright with TypeScript, Karate for REST and SOAP API tests, GitHub Actions for CI.

## What this project demonstrates

1. UI automation with Playwright and the Page Object Model. Every page of the checkout flow is modeled as a page object, so tests read like user journeys and locators live in exactly one place.
2. Data driven testing. One spec covers multiple personas: standard user happy path, locked out user negative path, and problem user visual defect. All inputs come from test-data/users.json, so adding a persona means adding a row instead of writing a new test.
3. API contract testing. Status codes, response shape, payload correctness, 404 handling, and response time checks, implemented in both Playwright and Karate.
4. Service virtualization. The payment gateway is mocked with route.fulfill to prove checkout degrades gracefully on an HTTP 500 response and a declined card. Failure paths are tested with zero real outages.
5. AI assisted test design. A language model drafted the initial test cases. They were reviewed, deduplicated, and the P0 cases were implemented. Both the prompt and the curated output are committed under ai-assisted.
6. Defect triage. A real UI defect found during testing is tracked as an expected failure, so the suite stays green while the bug is reverified on every run. It ships with a JIRA style report covering repro steps, expected versus actual behavior, screenshots, and trace evidence.
7. Continuous integration. Every push runs the full suite and uploads the HTML report, traces, screenshots, and video as build artifacts.

## Test suites

1. tests/e2e/checkout.spec.ts. End to end checkout flow: login, add to cart, checkout, and order confirmation, run across user personas.
2. tests/e2e/service-mocking.spec.ts. Payment gateway failures simulated through mocking: HTTP 500, declined card, and timeout handling.
3. tests/api/order-api.spec.ts. API contract tests covering CRUD operations, response schema, 404 responses, and response time limits.
4. karate/order-api.feature. The same API assertions written in Karate Gherkin syntax.

Result: 10 of 10 tests passing, locally and in CI. The DEFECT-101 case passes as an expected failure: the bug reproduces exactly as documented, which is the correct outcome for a tracked known defect.

## Project structure

```
pages/
  Page objects for Login, Inventory, Cart, and Checkout
tests/e2e/
  UI specs for the checkout flow and service mocking
tests/api/
  API specs using the Playwright request fixture
test-data/
  JSON inputs for data driven tests
karate/
  Karate version of the API tests
ai-assisted/
  Test design prompt and curated test cases
defect-report/
  JIRA style defect writeup with triage notes
.github/
  CI workflow with report artifacts
```

## How to run

Requires Node.js 18 or newer.

```
npm install
npx playwright install chromium
npx playwright test
npx playwright test tests/e2e
npx playwright test tests/api
npx playwright test --ui
npm run report
```

The Karate feature needs Java 11 or newer.
