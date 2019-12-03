import { GlobalOptions, ArmbariConfigurable } from "./api/common";
import { admin_v1 } from "./api/v1/admin/v1";
import { admin } from './api/v1/admin';

export class ArmbariApis {
    // not implemented yet
    _options: GlobalOptions = {};
    admin: admin_v1.Admin;
    constructor(options?: GlobalOptions) {
        this._options = options;
        this.admin = admin.bind(this)('v1')
    }

    /**
     * Set options.
     *
     * @param  {Object} [options] Configuration options.
     */
    options(options?: GlobalOptions) {
        this._options = options || {};
    }
}