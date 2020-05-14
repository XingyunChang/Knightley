const assert = require('assert');
const chai = require('chai');
const expect = require('chai').expect
const request = require('supertest');
const chaiHttp = require('chai-http');

const app = require('../app');

chai.use(chaiHttp);

describe('Testing the index route', function() {
    describe("User Login", function() {

      //unit test
      it('home page should return OK status', function() {
        return request(app)
          .get('/')
          .then(function(response) {
              assert.equal(response.status, 200)
          })
      });
      
      //integration test
      it('login page should accept valid password + username in databse', function() {
        return request(app)
        .post('/auth')
        .type('form')
        .send({
          username: "debug",
          password: "123"
        })
        .then(function(response) {
          expect(response.body[0].profession).to.contain("Debug Mode");
        })
      });

      //integration test
      it('login page should reject password + username not in database', function() {
        return request(app)
        .post('/auth')
        .type('form')
        .send({
          username: "",
          password: ""
        })
        .then(function(response) {
          expect(response.text).to.contain('Incorrect Username and/or Password!');
        })
      });

      //unit test
      it('empty username, password, or profession should be rejected', function() {
        return request(app)
        .post('/creating')
        .type('form')
        .send({
          username: "",
          password: "",
          profession: ""
        })
        .then(function(response) {
          expect(response.text).to.contain("Username and password must be greater than 5 characters");
        })
      });

      //unit test
      it('password and username below length 5 should be rejected', function() {
        return request(app)
        .post('/creating')
        .type('form')
        .send({
          username: "ajdd",
          password: "dalg",
          profession: "ddd"
        })
        .then(function(response) {
          expect(response.text).to.contain("Username and password must be greater than 5 characters");
        })
      });
      
    })

    describe("Testing Routes #route", function() {

      //unit test
      it('failure page should return OK status', function()  {
        return request(app)
          .get('/failure')
          .then(function(response) {
              assert.equal(response.status, 200)
          })
      });
  
      //unit test
      it('failure page should return message on rendering', function() {
        return request(app)
          .get('/failure')
          .then(function(response) {
              expect(response.text).to.contain('Failure Page');
          })
      });

      it('should render logged in user account', function() {
        return request(app)
        .get('/account')
        .then(function(response) {
          expect(response.text).to.contain("");
          console.log(response.text);
        })
      })
    })

});

      //Create(integration)
        //if unique username entered in, check databse for proper username, password, and profession
      
      //User Authentication login(integration)
        //FOR ALL: Google, Linkedin, Facebook
        //Make sure entering a correct account enters user's name as displayName, password as provider, and profession as null