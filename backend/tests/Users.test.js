require('dotenv').config()

let app = require('../app')
var request = require('supertest');
var expect = require('chai').expect;

describe('Users Route', function () {

    //SignIn Route Test
    describe('POST /signin', function () {
        //Sign In Test
        it('should send back an access token as JSON Object', function (done) {
            request(app)
                .post('/api/v1/users/signin')
                .set('Content-Type', 'application/json')
                .send({
                    "email": process.env.TEST_EMAIL,
                    "password": process.env.TEST_PASSWORD
                })
                .expect('Content-Type', /json/)
                .expect(200, function (err, res) {
                    if (err) {
                        return done(err);
                    }

                    let {
                        accessToken
                    } = res.body;
                    expect(accessToken).to.be.a('string');
                    // Done
                    done();
                });
        })

        //testing without email/password
        it('should return an error message when all inputs are not sent', function (done) {
            request(app)
                .post('/api/v1/users/signin')
                .set('Content-Type', 'application/json')
                .send({
                    "password": process.env.TEST_PASSWORD
                })
                .expect('Content-Type', /json/)
                .expect(400, function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    let {
                        message
                    } = res.body;
                    expect(message).to.be.a('string');

                    expect(message).to.equal('All input is required');

                    // Done
                    done();
                });
        })

        //testing with a wrong password
        it('should send back an error message when using a wrong password', function (done) {
            request(app)
                .post('/api/v1/users/signin')
                .set('Content-Type', 'application/json')
                .send({
                    "email": process.env.TEST_EMAIL,
                    "password": "wrongpassword"
                })
                .expect('Content-Type', /json/)
                .expect(400, function (err, res) {
                    if (err) {
                        return done(err);
                    }

                    let {
                        message
                    } = res.body;
                    expect(message).to.be.a('string');

                    expect(message).to.equal('Invalid Credentials');

                    // Done
                    done();
                });
        })


        //testing with an unregistered email
        it('should return an error message when using an unregistered email', function (done) {
            request(app)
                .post('/api/v1/users/signin')
                .set('Content-Type', 'application/json')
                .send({
                    "email": "unregisterd@email.com",
                    "password": "password"
                })
                .expect('Content-Type', /json/)
                .expect(400, function (err, res) {
                    if (err) {
                        return done(err);
                    }

                    let {
                        message
                    } = res.body;
                    expect(message).to.be.a('string');

                    expect(message).to.equal('Invalid Credentials');

                    // Done
                    done();
                });
        })
    })

    //Register Route Test
    describe('POST /register', function () {
        it('should send back an error message', function (done) {
            request(app)
                .post('/api/v1/users/register')
                .set('Content-Type', 'application/json')
                .send({
                    "first_name": "Test",
                    "last_name": "Account",
                    "email": process.env.TEST_EMAIL,
                    "password": process.env.TEST_PASSWORD
                })
                .expect('Content-Type', /json/)
                .expect(400, function (err, res) {
                    if (err) {
                        return done(err);
                    }

                    let {
                        error
                    } = res.body;
                    expect(error).to.be.a('string');
                    expect(error).to.equal('User Already Exist. Please Login');
                    // Done
                    done();
                });
        })
    })

    //Welcome Route Testing
    describe('GET /welcome', function () {
        it('should send back a welcome message', function (done) {
            request(app)
                .get('/api/v1/welcome')
                .set('Content-Type', 'application/json')
                .set('Authorization', process.env.TEST_TOKEN)
                .expect('Content-Type', /json/)
                .expect(200, function (err, res) {
                    if (err) {
                        return done(err);
                    }

                    let {
                        message
                    } = res.body;
                    expect(message).to.be.a('string');
                    expect(message).to.equal('Welcome to the API');
                    // Done
                    done();
                });
        })

        //testing without token
        it('should send back an error message when no token is sent', function (done) {
            request(app)
                .get('/api/v1/welcome')
                .set('Content-Type', 'application/json')
                .expect('Content-Type', /json/)
                .expect(403, function (error, res) {
                    if (error) {
                        return done(error);
                    }

                    let {
                        err
                    } = res.body;
                    expect(err).to.be.a('string');
                    expect(err).to.equal('A token is required for authentication');
                    // Done
                    done();
                });
        })

        //testing with invalid token
        it('should send back an error message when an invalid token is sent', function (done) {
            request(app)
                .get('/api/v1/welcome')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'invalidtoken')
                .expect('Content-Type', /json/)
                .expect(401, function (error, res) {
                    if (error) {
                        return done(error);
                    }

                    let {
                        err
                    } = res.body;
                    expect(err).to.be.a('string');
                    expect(err).to.equal('Invalid Token');
                    // Done
                    done();
                });
        })
    })
});