const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const app = require('../app');

describe('Unit testing the index route', function() {
    describe("User Login", function() {
      it('home page should return OK status', function() {
        return request(app)
          .get('/'
          .then(function(response) {
              assert.equal(response.status, 200)
          })
      });
      //Login(integration)
        //if incorrect username or password, message "Incorrect Username and/or Password!" should appear
        //if correct username and password display id, username, password, and created at time

    })
    
      //Create(integration)
        //if username entered in already in database, message 'Sorry, username is taken' should appear
        //if unique username entered in, check databse for proper username, password, and profession
      
      //User Authentication login(integration)
        //FOR ALL: Google, Linkedin, Facebook
        //Make sure entering a correct account enters user's name as displayName, password as provider, and profession as null
        

    it('failure page should return OK status', function()  {
      return request(app)
        .get('/failure')
        .then(function(response) {
            assert.equal(response.status, 200)
        })
    });

    it('failure page should return message on rendering', function() {
      return request(app)
        .get('/failure')
        .then(function(response) {
            expect(response.text).to.contain('Failure Page');
