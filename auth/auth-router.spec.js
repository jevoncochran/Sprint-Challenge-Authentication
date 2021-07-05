const request = require('supertest');
const server = require('../api/server');
const users = require('./users-model');
const db = require('../database/dbConfig');

describe('auth router', function() {
    describe('test environment', function() {
        it('should use the testing environment', function() {
            expect(process.env.DB_ENV).toBe('testing');
        })
    })
})

describe('POST /api/auth/register tests', function() {
    beforeEach(async () => {
        await db('users').truncate();
    })

    describe('insert()', function() {
        it('adds a new user to the database', async function() {
            await users.add({ username: 'jevon', password: 'cochran' });

            const table = await db('users');

            expect(table).toHaveLength(1);
        })

        it('should insert provided user into the database', async function() {
            let newUser = await users.add({ username: 'leroy', password: 'gatlin' });

            expect(newUser.username).toBe('leroy');
        })
    })

    describe('POST /api/auth/login tests', function() {
        it('returns 200 OK', async function() {
            let credentials = { username: 'leroy', password: 'gatlin' }
            await request(server)
                .post('/api/auth/register')
                .send(credentials)

           return request(server)
            .post('/api/auth/login')
            .send(credentials)
            .then(res => {
                expect(res.status).toBe(200);
            })
    
        })

        it('welcomes the user upon login', async function() {
            let credentials = { username: 'tasha', password: 'pollard' }
            await request(server)
                .post('/api/auth/register')
                .send(credentials)

            return request(server)
                .post('/api/auth/login')
                .send(credentials)
                .then(res => {
                    expect(res.type).toMatch(/json/i)
                })
        })
    })
})

