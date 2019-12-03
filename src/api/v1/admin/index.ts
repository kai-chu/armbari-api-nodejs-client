import { admin_v1 } from './v1';
import { getAPI, ArmbariConfigurable } from '../../common';

export const VERSIONS = {
    v1: admin_v1.Admin
}

export function admin(version: 'v1'): admin_v1.Admin;
export function admin(options: admin_v1.Options): admin_v1.Admin;
export function admin<T = admin_v1.Admin>(
    this: ArmbariConfigurable,
    versionOrOptions: 'v1' | admin_v1.Options) {
    return getAPI<T>('admin', versionOrOptions, VERSIONS, this);
}