# Car Dealer Application

This is a simple car dealer application built using Next.js. The app allows users to filter vehicles by type and model year.

## Features

- Filter vehicles by make and model year
- Fetch and display vehicle models from an external API
- Responsive UI styled with Tailwind CSS
- Dynamic routing with Next.js
- Static and server-side rendering

## Technologies

- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **Linting/Formatting:** ESLint and Prettier
- **API:** [NHTSA API](https://vpic.nhtsa.dot.gov/api)

## Environment Variables

Add a `.env.local` file in the root directory with the following variable:

```plaintext
NEXT_PUBLIC_API_BASE_URL=https://vpic.nhtsa.dot.gov/api
```
