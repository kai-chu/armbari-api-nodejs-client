import { APIRequestParams } from "./api";
import { GaxiosPromise } from 'gaxios';
import * as urlTemplate from 'url-template';
import { DefaultTransporter } from ".";
// tslint:disable-next-line no-var-requires
const pkg = require('../../../../package.json');

export function createAPIRequest<T>(
  parameters: APIRequestParams
): GaxiosPromise<T> {
  return createAPIRequestAsync(parameters);
}

async function createAPIRequestAsync<T>(parameters: APIRequestParams) {
  let params = parameters.params;
  const options = Object.assign({}, parameters.options);
  // Create a new params object so it can no longer be modified from outside
  // code Also support global and per-client params, but allow them to be
  // overriden per-request
  const topOptions = parameters.context.armbari
    ? parameters.context.armbari._options.params
    : {};

  const mutParams = Object.assign(
    {}, // New base object
    topOptions, // Global params
    parameters.context._options.params, // Per-client params
    params // API call params
  );

  const media = mutParams.media || {};

  let authClient =
    params.auth ||
    parameters.context._options.auth ||
    (parameters.context.armbari
      ? parameters.context.armbari._options.auth
      : null);

  // Grab headers from user provided options
  const headers = params.headers || {};
  options.headers = headers;
  // Parse urls
  if (options.url) {
    options.url = urlTemplate.parse(options.url).expand(params);
  }

  // if (!isBrowser()) {
  options.headers!['Accept-Encoding'] = 'gzip';
  const directives = options.userAgentDirectives || [];
  directives.push({
    product: 'armbari-api-nodejs-client',
    version: pkg.version,
    comment: 'gzip',
  });
  const userAgent = directives
    .map(d => {
      let line = `${d.product}/${d.version}`;
      if (d.comment) {
        line += ` (${d.comment})`;
      }
      return line;
    })
    .join(' ');

  options.headers!['User-Agent'] = userAgent;


  // By default gaxios treats any 2xx as valid, and all non 2xx status
  // codes as errors.  This is a problem for HTTP 304s when used along
  // with an eTag.
  if (!options.validateStatus) {
    options.validateStatus = status => {
      return (status >= 200 && status < 300) || status === 304;
    };
  }

  // Retry by default
  options.retry = options.retry === undefined ? true : options.retry;


  //}
  // Combine the GaxiosOptions options passed with this specific
  // API call witht the global options configured at the API Context
  // level, or at the global level.
  const mergedOptions = Object.assign(
    {},
    parameters.context.armbari ? parameters.context.armbari._options : {},
    parameters.context._options,
    options
  );
  delete mergedOptions.auth; // is overridden by our auth code

  return new DefaultTransporter().request<T>(mergedOptions);
}