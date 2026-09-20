# AI-assisted test case generation

## The prompt (paste into any LLM)

> You are a senior QA engineer. Read the user story below and generate test
> cases for it. Output a markdown table with columns: ID, Title, Type
> (Positive / Negative / Boundary / UI), Priority (P0-P3), Steps, Expected
> result. Cover the happy path, validation errors, and at least two edge
> cases. Keep steps atomic and expected results verifiable. Do not invent
> features that are not in the story.

## The user story I fed it

> As a shopper on the SauceDemo store, I want to check out with items in my
> cart, so that my order is placed successfully.
> Acceptance criteria:
> - I must be logged in to check out.
> - I enter first name, last name and zip code; all three are required.
> - After finishing, I see an order confirmation page.

## What I did with the output

1. Reviewed all 10 generated cases, dropped 2 near-duplicates.
2. Kept the negative cases (locked out user, empty cart, missing zip) as the
   highest value automation candidates.
3. Implemented the P0 happy path plus the locked-out negative path in
   `tests/e2e/checkout.spec.ts` (data driven from `test-data/users.json`).

## Why this matters for the role

The job description asks for experience using AI-assisted tools for test case
generation. This shows the workflow end to end: prompt -> generated cases ->
human review -> automated implementation. The skill is not "the AI wrote it",
it is knowing how to direct, filter and convert AI output into a real suite.
