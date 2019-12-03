import { GaxiosResponse, GaxiosOptions } from "gaxios";

/**
 * Mock OAuth2Client, shall be replaced with some real implementation
 */
export interface OAuth2Client {

}


/**
 * An additional directive to add to the user agent header.
 * Directives come in the form of:
 * User-Agent: <product> / <product-version> <comment>
 *
 * For more information, see:
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent
 */
export interface UserAgentDirective {
    product: string;
    version: string;
    comment?: string;
}

export interface MethodOptions extends GaxiosOptions {
    rootUrl?: String;
    userAgentDirectives?: UserAgentDirective[]
}

/**
 * This interface is a mix of the AxiosRequestConfig options
 * and our `auth: OAuth2Client|string` options.
 */
export interface GlobalOptions extends MethodOptions {
    auth?: string | OAuth2Client;
}

export interface ServiceOptions extends GlobalOptions {
    version?: string;
}


export interface ArmbariConfigurable {
    _options: GlobalOptions;
}

export interface APIRequestContext {
    armbari: ArmbariConfigurable;
    _options: GlobalOptions;
}

export type BodyResponseCallback<T> = (
    err: Error | null,
    res?: GaxiosResponse<T> | null
) => void;

// tslint:disable-next-line no-any
export interface APIRequestParams<T = any> {
    options: MethodOptions;
    params: T;
    requiredParams: string[];
    pathParams: string[];
    context: APIRequestContext;
    mediaUrl?: string | null;
  }
  

// tslint:disable-next-line: no-any
// export type APIEndpoint = Readonly<Endpoint & any>;