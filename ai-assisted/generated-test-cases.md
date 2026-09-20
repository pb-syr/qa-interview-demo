# Generated test cases (from the prompt in test-case-prompt.md)

Reviewed and curated: kept 8, dropped TC-07 and TC-09 as duplicates of TC-02.

| ID | Title | Type | Priority | Steps | Expected result |
|----|-------|------|----------|-------|-----------------|
| TC-01 | Checkout happy path, 2 items | Positive | P0 | 1. Log in as standard_user 2. Add Backpack and Bike Light 3. Open cart 4. Checkout 5. Enter first/last/zip 6. Finish | "Thank you for your order" confirmation page is shown |
| TC-02 | Locked out user cannot check out | Negative | P0 | 1. Log in as locked_out_user | "Sorry, this user has been locked out." banner; no inventory page |
| TC-03 | Checkout with empty cart | Negative | P1 | 1. Log in 2. Open cart 3. Checkout | Checkout is blocked or order total is $0.00 with no items |
| TC-04 | Missing zip code | Negative | P1 | 1. Log in 2. Add item 3. Checkout 4. Enter first/last only 5. Continue | "Error: Postal Code is required" |
| TC-05 | Missing first name | Negative | P2 | 1. Log in 2. Add item 3. Checkout 4. Enter last/zip only 5. Continue | "Error: First Name is required" |
| TC-06 | Cart badge count matches items added | UI | P1 | 1. Log in 2. Add 2 items | Cart badge shows "2" |
| TC-07 | ~~Checkout button disabled with no items~~ | UI | P2 | dropped: duplicate of TC-03 | - |
| TC-08 | Order total includes tax | Boundary | P2 | 1. Complete a checkout | Item total + tax equals the shown total |
| TC-09 | ~~Back button after order completion~~ | UI | P3 | dropped: low value, covered by TC-01 | - |
| TC-10 | problem_user product images | UI | P2 | 1. Log in as problem_user 2. View inventory | Each product shows its own image (currently fails: DEFECT-101) |

Implemented in automation: TC-01, TC-02, TC-06 (in `tests/e2e/checkout.spec.ts`), TC-10 as a tracked known failure.
