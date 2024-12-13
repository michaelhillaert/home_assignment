# Home Assignment

A responsive e-commerce web application using React
that retrieves a list of products from the Fake Store API, displays
them to the user, allows the user to add items to a basket, and
includes a product details page.

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Hosting

Since Remix can run in any simple JavaScript environment it would be best to host it on Cloudflare Pages or other edge solutions to get the maximum performance.

Vercel now also offers the [Edge Network](https://vercel.com/docs/edge-network/overview) which should be comparable to Cloudflare workers

## Setup

### Framework

Next.js is the industry standard when it comes to React Frameworks. But I wanted to try out Remix because it gains more traction and is especially well equipt to handle ecommerce applications.

- 📖 [Remix docs](https://remix.run/docs)

### Styling

For styling the choice was to go with Material UI or Chakra UI. While Chakra UI specialised on ease-of-use and is ideal for small projects and prototyping, Material UI is better suited for large applications with more complex components.

For this application I opted to go with Material UI (MUI) to demonstrate how it can be intergrated into Remix.

For the integration of MUI see
https://github.com/mui/material-ui/blob/master/examples/material-ui-remix-ts/README.md
https://github.com/iskanderbroere/remix-material-ui-example

MUI supports both emotion and Styled Components as styling engines. Since there are issues with Styled Components in SSR we will use emotion.

https://mui.com/material-ui/getting-started/installation/#with-styled-components

This version includes `@mui/material` and its peer dependencies, including [Emotion](https://emotion.sh/docs/introduction), the default style engine in Material UI v6.

### Data fetching

Remix brings its own data loading functionality.

https://remix.run/docs/en/main/guides/data-loading

The goal is to load everything via the server and reuse the same functionality even for client side data fetching. This way Remix can optimize caching and the data is synced.

For the search I used pure client side data fetching to demonstrate how this can be easily plugged in without needing to use Remix fetcher hooks.

### State Management

For state manangement the context is used and the Cart is persistet in the local storage across refreshes

## Features

### Product List

- The categories are retrieved via API and displayed in the main navigation
- Products can be filtered via their refinements (price). This is also reflected in the URL
- Prodcuts can be added to the cart from the PLP directly

### Cart

- Cart items can be removed
- Cart item quantities can be managed

### Search

- All products can be searched by title
- The search is case-insensitive

### Product Details

- Products details are shown on a dedicated page
