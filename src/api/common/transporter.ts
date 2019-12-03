import {
    GaxiosError,
    GaxiosOptions,
    GaxiosPromise,
    GaxiosResponse,
    request,
} from 'gaxios';
import { validate } from './options';


// tslint:disable-next-line no-var-requires
const pkg = require('../../../../package.json');
const PRODUCT_NAME = 'armbari-api-nodejs-client';

export interface Transporter {
    request<T>(opts: GaxiosOptions): GaxiosPromise<T>;
}

export interface RequestError extends GaxiosError {
    errors: Error[];
}

/**
 * Makes a request using Gaxios with given options.
 * @param opts GaxiosOptions options.
 * @return GaxiosPromise
 */
export class DefaultTransporter {
    /**
     * Default user agent.
     */
    static readonly USER_AGENT = `${PRODUCT_NAME}/${pkg.version}`;

    /**
   * Configures request options before making a request.
   * @param opts GaxiosOptions options.
   * @return Configured options.
   */
    configure(opts: GaxiosOptions = {}): GaxiosOptions {
        opts.headers = opts.headers || {};
        if (typeof window === 'undefined') {
            // set transporter user agent if not in browser
            const uaValue: string = opts.headers['User-Agent'];
            if (!uaValue) {
                opts.headers['User-Agent'] = DefaultTransporter.USER_AGENT;
            } else if (!uaValue.includes(`${PRODUCT_NAME}/`)) {
                opts.headers[
                    'User-Agent'
                ] = `${uaValue} ${DefaultTransporter.USER_AGENT}`;
            }
            // track armbari-library-nodejs version:
            const authVersion = `api/${pkg.version}`;
            if (
                opts.headers['x-armbari-api-client'] &&
                !opts.headers['x-armbari-api-client'].includes(authVersion)
            ) {
                opts.headers[
                    'x-armbari-api-client'
                ] = `${opts.headers['x-armbari-api-client']} ${authVersion}`;
            } else if (!opts.headers['x-armbari-api-client']) {
                const nodeVersion = process.version.replace(/^v/, '');
                opts.headers[
                    'x-armbari-api-client'
                ] = `gl-node/${nodeVersion} ${authVersion}`;
            }
        }
        return opts;
    }

    request<T>(opts: GaxiosOptions): GaxiosPromise<T> {
        // ensure the user isn't passing in request-style options
        opts = this.configure(opts);
        try {
            validate(opts);
        } catch (e) {
            throw e;
        }

        return request<T>(opts).catch(e => {
            throw this.processError(e);
        });
    }

    /**
   * Changes the error to include details from the body.
   */
    private processError(e: GaxiosError): RequestError {
        const res = e.response;
        const err = e as RequestError;
        const body = res ? res.data : null;
        if (res && body && body.error && res.status !== 200) {
            if (typeof body.error === 'string') {
                err.message = body.error;
                err.code = res.status.toString();
            } else if (Array.isArray(body.error.errors)) {
                err.message = body.error.errors
                    .map((err2: Error) => err2.message)
                    .join('\n');
                err.code = body.error.code;
                err.errors = body.error.errors;
            } else {
                err.message = body.error.message;
                err.code = body.error.code || res.status;
            }
        } else if (res && res.status >= 400) {
            // Consider all 4xx and 5xx responses errors.
            err.message = body;
            err.code = res.status.toString();
        }
        return err;
    }
}
