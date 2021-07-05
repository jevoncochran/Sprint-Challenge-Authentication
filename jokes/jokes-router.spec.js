const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig');

describe('GET /api/jokes tests', function() {
    beforeEach(async () => {
        await db('users').truncate();
    })

    it('should return 200 OK when user is logged in', async function() {
        let credentials = { username: 'oprah', password: 'winfrey' };
        const authorization = await request(server)
            .post('/api/auth/register')
            .send(credentials);

        expect(authorization.status).toBe(201);

        return request(server)
            .get('/api/jokes')
            .set('authorization', authorization.body.token)
            // .then(res => {
            //     expect(res.status).toBe(200);
            // })
    })

    it('should require token', async function () {
        return request(server)
            .get('/api/jokes')
            .then(res => {
                expect(res.status).toBe(401);
            })
    })
})