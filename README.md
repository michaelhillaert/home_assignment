# Welcome to Remix!

- 📖 [Remix docs](https://remix.run/docs)

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

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

For styling the choice was to go with Material UI or Chakra UI. While Chakra UI specialised on ease-of-use and is ideal for small projects and prototyping, Material UI is better suited for large applications with more complex components.

For this application I opted to go with Material UI (MUI) to demonstrate how it can be intergrated into Remix.

MUI supports both emotion and Styled Components as styling engines. Since there are issues with Styled Components in SSR we will use emotion.

https://mui.com/material-ui/getting-started/installation/#with-styled-components

This version includes `@mui/material` and its peer dependencies, including [Emotion](https://emotion.sh/docs/introduction), the default style engine in Material UI v6.
