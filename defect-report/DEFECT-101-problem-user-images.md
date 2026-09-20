# DEFECT-101: problem_user sees incorrect product images

**Severity:** Medium | **Priority:** P3
**Environment:** https://www.saucedemo.com, Desktop Chrome, user `problem_user`
**Found by:** automated regression (`tests/e2e/checkout.spec.ts` > DEFECT-101)
**Status:** Open, tracked as expected-failure in the suite

## Steps to reproduce

1. Log in as `problem_user` / `secret_sauce`.
2. Observe the inventory list.

## Expected result

Each product tile shows its own image (the backpack tile shows the backpack).

## Actual result

Product images do not match their products; the `src` attribute of
`[data-test="inventory-item-sauce-labs-backpack-img"]` does not contain
`backpack`.

## Evidence

- Playwright trace + screenshot + video captured on failure (config:
  `trace: 'retain-on-failure'`). Open with `npm run report`.
- Failing assertion: `tests/e2e/checkout.spec.ts` (DEFECT-101 test).

## Triage notes

- Reproducible on every run for `problem_user`; `standard_user` is unaffected,
  so this is persona-specific test data/rendering, not a global outage.
- No workaround needed for shoppers; cosmetic but erodes trust in the catalog.
- Kept visible via `test.fail('DEFECT-101')` so the regression suite stays
  green while the defect stays tracked and re-verified every run.

## How I would file this in JIRA

Summary: `[problem_user] Product images do not match catalog items`
Labels: `regression`, `ui`
Linked: the trace/screenshot from the HTML report, plus this writeup.
