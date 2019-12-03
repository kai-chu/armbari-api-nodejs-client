import { ArmbariConfigurable, ServiceOptions } from '.';

export function getAPI<T>(
    api: string,
    options: ServiceOptions | string,
    // tslint:disable-next-line no-any
    versions: { [index: string]: any },
    context?: ArmbariConfigurable
) {
    let version: string;
    if (typeof options === 'string') {
        version = options;
        options = {};
    } else if (typeof options === 'object') {
        version = options.version!;
        delete options.version;
    } else {
        throw new Error('Argument error: Accepts only string or object');
    }
    try {
        const ctr = versions[version];
        const ep = new ctr(options, context);
        return Object.freeze(ep) as T;
    } catch (e) {
        throw new Error(
            `Unable to load endpoint ${api}("${version}"): ${e.message}`
        );
    }
}