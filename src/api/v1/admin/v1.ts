import { GlobalOptions, APIRequestContext, ArmbariConfigurable, createAPIRequest, MethodOptions } from "../../common";
import { GaxiosPromise } from "gaxios";
export namespace admin_v1 {
    export interface Options extends GlobalOptions {
        version: 'v1';
    }

    export class Admin {
        context: APIRequestContext;
        users: Resource$Users;
        groups: Resource$Groups;
        constructor(options: GlobalOptions, armbari: ArmbariConfigurable) {
            this.context = {
                _options: options || {},
                armbari
            }
            this.groups = new Resource$Groups(this.context);
            this.users = new Resource$Users(this.context);
        }
    }

    class Resource$Groups {
        context: APIRequestContext;
        constructor(context: APIRequestContext) {
            this.context = context;
        }

        /**
         * Group.groups.get
         * @desc Get a post by id.
         * @alias blogger.posts.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.blogId ID of the blog to fetch the post from.
         * @param {string} params.postId The ID of the post
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */

    }


    export class Resource$Users {
        context: APIRequestContext
        constructor(context: APIRequestContext) {
            this.context = context;
        }

        /**
         * users.list
         * @desc Retrieves users
         * @alias users.list
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         */

        list(options?: MethodOptions): GaxiosPromise<Schema$UserList> {
            // Make method options not null
            let _options = options || {};
            const rootUrl = _options.rootUrl || 'http://localhost:8080';

            // Construct parameters to construct GaxiosPromise with createAPIRequest
            const parameters = {
                options: Object.assign(
                    {
                        url: rootUrl + '/users',
                        method: 'GET'
                    },
                    options,
                ),
                params: [],
                requiredParams: [],
                pathParams: [],
                context: this.context,
            };

            return createAPIRequest<Schema$UserList>(parameters);
        }
    }

    export interface Schema$User {
        /**
         * The username of this user
         */
        userName?: string | null
    }

    export interface Schema$UserList {
        /**
         * The list of Users in Armbari
         */
        items?: Schema$User[];
        /**
         * The kind of this entity. Always userlist
         */
        kind?: string | null;
    }

}