import { armbari } from '../../src';
import * as nock from 'nock';
import * as assert from 'assert';
import { GaxiosResponse } from 'gaxios';
import { admin_v1 } from '../../src/api/v1/admin/v1';

describe('admin samples', () => {
    it('Should return lists of users', async () => {
        const scope = nock('http://localhost:8080').get(`/users`).reply(200, [{ username: 'mockUser' }]);
        armbari.options({ auth: 'user:pass' });
        let users: GaxiosResponse<admin_v1.Schema$UserList> = await armbari.admin.users.list();
        assert(users);
        assert.strictEqual(users.status, 200, 'Wrong response status');
        assert.deepEqual(users.data, [{ username: 'mockUser' }]);
        scope.done();
    })
})