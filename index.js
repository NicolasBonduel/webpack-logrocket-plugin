const logrocketCLI = require('logrocket-cli');

const pluginName = 'webpack-logrocket-plugin';
class WebpackLogrocketPlugin {
  constructor({
    paths,
    release,
    apiKey,
    urlPrefix,
    strict,
    verbose,
    actions = ['release', 'upload'],
  } = {}) {
    this.paths = paths;
    this.release = release;
    this.apiKey = apiKey;
    this.urlPrefix = urlPrefix;
    this.strict = strict;
    this.verbose = verbose;
    this.actions = typeof actions === 'string' ? [actions] : actions;
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tapPromise(pluginName, async (compilation) => {
      try {
        if (this.actions.includes('release')) {
          await logrocketCLI.release({
            version: this.release,
            apikey: this.apiKey,
            strict: this.strict,
            verbose: this.verbose,
          });
        }
        if (this.actions.includes('upload')) {
          await logrocketCLI.upload({
            paths: `${this.paths}`,
            release: this.release,
            apikey: this.apiKey,
            apihost: this.apihost,
            urlPrefix: this.urlPrefix,
            strict: this.strict,
            verbose: this.verbose,
          });
        }
      } catch (err) {
        err.message = `${pluginName}: ${err.message}`;
        console.error(err.message);
        compilation.errors.push(err);
      }
    });
  }
}

module.exports = WebpackLogrocketPlugin;
