# webpack-logrocket-plugin

A webpack plugin wrapping the Logrocket CLI.

## Usage

```
const WebpackLogrocketPlugin = require('webpack-logrocket-plugin');

const config = {
  plugins: [
    new WebpackLogrocketPlugin({
      paths: './dists',
      release: '1.2.3',
      apiKey: '<your-logrocket-api-key>',
    }),
  ],
};
```

| Option | Type | Required | Description |
---------|------|----------|-------------
| paths | `string`/`array` | required | One or more paths that LogRocket CLI should scan recursively for sources. It will upload all `.map` files and match associated `.js` files. |
| release | `string` | required | A release can be any version string, such as `2.4.6` or a commit hash such as `b620fm`. |
| apiKey | `string` | required | Your LogRocket API key. It can be found in your app settings. Make sure to copy it in its entirety. |
| urlPrefix | `string` | optional | If your assets are hosted in a subfolder, then provide a urlPrefix option to the upload command matching the path relative to the hostname (you may replace the hostname with ~). |
| actions | `string`/`array` | optional | Can contain `release` - to create a release on LogRocket, `upload` - to upload sourcemaps, or both, in an array. Default: `["release", "upload"]` |
