# news-JS (TypeScript)

News app built with TypeScript, Webpack and the [News API](https://newsapi.org/).
Originally a JavaScript app, migrated to TypeScript with `strict` mode, ESLint (`no-explicit-any`) and an adaptive layout.

## Run the application

1. Copy `.env.example` to `.env` and set the variables:
    - `API_URL` - base URL of the API (`https://newsapi.org/v2/` for localhost, or the proxy `https://rss-news-api.onrender.com/` for a deployed build)
    - `API_KEY` - your own key from [newsapi.org](https://newsapi.org/)
2. Install dependencies: `npm install`
3. Start the dev server: `npm start`

## Scripts

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `npm start`         | dev server with hot reload           |
| `npm run build`     | production build into `dist/`        |
| `npm run lint`      | ESLint for TypeScript                |
| `npm run lint:fix`  | ESLint with auto-fix                 |
| `npm run typecheck` | `tsc --noEmit`                       |
| `npm run deploy`    | build and publish `dist/` to gh-pages |

## Project structure

```
src/
  index.ts                  entry point
  types/                    enums, interfaces and utility types for the API
  utils/dom.ts              typed DOM helper
  components/
    app/                    application bootstrap
    controller/             loader, app loader and controller
    view/                   news and sources views
```
