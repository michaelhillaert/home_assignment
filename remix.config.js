/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  appDirectory: 'app',
  browserBuildDirectory: 'public/build',
  publicPath: '/build/',
  serverBuildDirectory: 'build',
  devServerPort: 3000,
  // TODO: when mui has esm support, remove this (default is esm)
  // check it https://github.com/mui/material-ui/issues/30671
  serverModuleFormat: 'cjs',
}
