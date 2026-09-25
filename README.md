# nicelydone-review-dashboard

React + Vite dashboard (tested with Vitest) that **reads review records** from
`nicelydone-review-api` for the Nicelydone review demo system.

## Data flow

- **`nicelydone-review-api`** owns the review records.
- **This dashboard reads those records** from the API (`VITE_API_URL`).
- The API can send a `review.completed` event to **`nicelydone-review-notifier`**.

> ⚠️ These repositories are **disposable** demo repositories. The intentionally
> flawed pull-request branches must **not** be deployed.

## Features

- Reads `VITE_API_URL` and loads records from `nicelydone-review-api`.
- **Total-review** and **average-rating** summary cards.
- Filter records by **repository** and **rating**.
- Renders **loading**, **populated**, **empty**, and **request-error** states.

## Run

```bash
npm install
npm test
VITE_API_URL=http://localhost:3001 npm run dev
```

With `nicelydone-review-api` running on port 3001, the three fixture records
appear in the table and the summary cards.
