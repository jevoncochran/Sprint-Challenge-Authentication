const request = require('supertest');
const server = require('../api/server');

describe('server.js', function() {
    describe('GET /', function(){
        it('should return 200 OK', function() {
            return request(server).get('/')
                .then(res => {
                    expect(res.status).toBe(200);
                })
        })
    })
})

describe('auth router', function() {
    describe('GET /api/auth', function() {
        it('should return 200 OK', function() {
            return request(server).get('/api/auth')
                .then(res => {
                    expect(res.status).toBe(200);
                })
        })
    })
})