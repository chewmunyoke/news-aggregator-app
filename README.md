# News Aggregator App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Other tech stack used:

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Tailwind.css](https://tailwindcss.com/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## Getting Started

### 1. Clone

Clone this repository by clicking on the `Code` button on the top right.

### 2. API Key

This repo uses an API key from [mediastack](https://mediastack.com/).

Simply sign up for an account with a Free Plan to obtain an API key.

Create a file named `.env.local` in the repo's root directory, then enter the following string with your API key.

```
NEXT_PUBLIC_MEDIASTACK_API_KEY="your_api_key"
```

### 3. Run Locally

Next, change directory to the repo and run the development server:

```bash
cd path/to/news-aggregator-app

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Navigate to [http://localhost:3000](http://localhost:3000) with your internet browser to see the result.

## Overview

### API

The app consumes mediastack's [Live News API](https://mediastack.com/documentation#live_news).

The user is able to click on a Category tab to view only news under that category. The user is also able to filter news based on Country and Language, as well as sorting and searching for news associated with one or more keywords.

### Data handling

Data fetching is done via server-side in an asynchronous React Server Component (`src/app/news/[slug]/page.tsx`). [[Reference](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#fetching-data-on-the-server-with-the-fetch-api)]

This approach is chosen due to the various benefits of server rendering. [[Reference](https://nextjs.org/docs/app/building-your-application/rendering/server-components#benefits-of-server-rendering)]

The GET request is hardcoded with a `limit` parameter of `100`, as that is the maximum allowed limit value on a Free Plan. Due to server-side fetching, all data is displayed at once on the page and there is no need to implement paginated fetching in client-side, which may result in duplicated data in subsequent pages due to new data being frequently added. However, the user will need to refresh the page to fetch the latest batch of data.

The data fetched is automatically cached. After **5 minutes**, the cache will be invalidated on the next visit of the page. [[Reference](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#revalidating-data)]

https://github.com/chewmunyoke/news-aggregator-app/blob/c7f26fbb25853ba9b778fee909a6296a6c04067d/src/app/news/%5Bslug%5D/page.tsx#L10

To further improve app performance, images are loaded via native lazy loading; offscreen images are not fetched until the user scrolls near them. [[Reference](https://addyosmani.com/blog/lazy-loading/)]

### UI/UX

The app uses the mobile-first approach to responsive design as recommended by Tailwind.css. [[Reference](https://tailwindcss.com/docs/responsive-design)]

On desktop, the search bar is sticky on the top of the page to allow easy access as the user scrolls down. On mobile, the search bar hides itself as the user scrolls down to maximize the news view, and unhides itself as soon as the user scrolls up.

Upon clicking on a news card, a modal will appear with more details of the article and a link to the publisher's website. Besides the `Close` button, the user can click outside the modal or press `Escape` key to close the modal as well.

The user is also able to switch between light & dark modes using the toggle positioned at the page's bottom right corner.

CSS animations will be deactivated if the user's device has the motion reduction setting enabled. [[Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)]

## Potential Improvements

- Enabling multi-select for Country and Language
- Searching with a date or date range parameter
- Searching for news sources
