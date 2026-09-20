# Retail Checkout QA Demo

An end to end QA demonstration built as interview material for a **QA Engineer**
role: Playwright UI automation (page object model, data driven), API testing,
service layer mocking, AI-assisted test case generation, defect triage with
traces, HTML reporting and CI.

## How it maps to the job description

| Job requirement | Where it lives in this repo |
|---|---|
| Playwright for modern web UIs | `tests/e2e/checkout.spec.ts` (POM, data driven) |
| Selenium for UI validation | Production background (McDonald's POS); same POM discipline applies |
| REST/SOAP API validation (Karate) | `karate/order-api.feature` + `tests/api/order-api.spec.ts` |
| AI-assisted test case generation | `ai-assisted/test-case-prompt.md` + `generated-test-cases.md` |
| Defect summarization | `defect-report/DEFECT-101-problem-user-images.md` + HTML report traces |
| Regression analysis | Data driven suite; known defect tracked via `test.fail('DEFECT-101')` |
| Test data preparation | `test-data/users.json` |
| BDD/TDD, data driven testing | Data driven specs; Gherkin feature file |
| Mocking service layers | `tests/e2e/service-mocking.spec.ts` (route.fulfill) |
| Git, CI/CD pipelines | `.github/workflows/ci.yml`, HTML report artifact |
| JavaScript scripting | Whole suite is TypeScript |

## Quickstart

Prerequisites: Node.js 18+.

```bash
npm install
npx playwright install chromium
npx playwright test          # everything
npx playwright test tests/e2e  # UI only
npx playwright test tests/api  # API only
npm run report               # open the HTML report
```

The Karate feature needs Java 11+: `java -jar karate.jar karate/order-api.feature`.

## Demonstration 

**1. AI-assisted test case generation (2 min).**
Open `ai-assisted/test-case-prompt.md`. Show the prompt, then
`generated-test-cases.md`: "I had the LLM draft 10 cases, I reviewed them,
dropped 2 duplicates, and implemented the P0s. The skill is directing and
filtering AI output, not just accepting it."

**2. Live E2E run (3 min).**
`npx playwright test tests/e2e/checkout.spec.ts --headed`.
Narrate: page object model, data driven from `test-data/users.json`
(standard user happy path + locked-out negative path).

**3. API + mocking (2 min).**
`npx playwright test tests/api` — contract, payload, 404, SLA checks.
Then open `tests/e2e/service-mocking.spec.ts`: "I mock the payment service
with route.fulfill to prove checkout degrades gracefully on a 500 and a
declined card — no real outage needed." Open `karate/order-api.feature`:
"Same API assertions in Karate's DSL from my training."

**4. Defect triage (2 min).**
`npm run report` — open the DEFECT-101 expected failure, play the trace,
show the screenshot. Then open
`defect-report/DEFECT-101-problem-user-images.md`: "This is exactly how I
would file it in JIRA — repro steps, expected vs actual, evidence attached,
triage notes. The suite stays green via test.fail so the defect is tracked
and re-verified every run instead of being forgotten."

**5. CI (1 min).**
Open `.github/workflows/ci.yml`: "Every push runs the suite and uploads the
HTML report as an artifact — the same shape as a Jenkins pipeline publishing
test reports."

## Role Alignment:

- **Depth story (production):** 3.5 years QA on McDonald's POS (NP6),
  Backoffice, kiosk and digital ordering across US/AU. Regression,
  deployment validation (RFM/SmartUpdate), production triage with onshore
  teams, defect trend dashboards, 20% defect leakage reduction.
- **Selenium mastery:** Selenium based UI validation and regression in the
  OpenTest framework across POS terminals — this demo applies the same POM
  discipline in Playwright.
- **API testing mastery:** REST payload validation (JSON/XML), HTTP traffic
  analysis with Fiddler for defect reproduction, Karate training for
  REST/SOAP.
- **AI in testing:** built NLP/LLM systems (BERT/SBERT, chatbot); here AI
  drafts test cases and I curate and implement them.
- **Honest framing:** Playwright, Karate, Jenkins, QMetry/Zephyr, Go come
  from Capgemini automation training (2nd rank in batch) plus this
  self-driven demo — say exactly that, and let the demo do the talking.

## Repo map

```
pages/            Page objects (Login, Inventory, Cart, Checkout)
tests/e2e/        UI specs: checkout flow, service mocking
tests/api/        API specs (Playwright request fixture)
test-data/        Data driven inputs (users, products)
karate/           Karate DSL version of the API tests
ai-assisted/      Prompt + curated generated test cases
defect-report/    JIRA style defect writeup with triage notes
.github/          CI workflow with report artifact
```
