const assert = require('assert');
const chai = require('chai');
const expect = require('chai').expect
const request = require('supertest');
const chaiHttp = require('chai-http');


const app = require('../app');
const mysqlDb = require('./../mysqlConn')

chai.use(chaiHttp);

describe('Testing the index route', function() {
  describe("Login and Create Account", function() {

      //unit test
      it('home page should return OK status #unit', function() {
        return request(app)
          .get('/')
          .then(function(response) {
              assert.equal(response.status, 200)
          })
      });
      
      //integration test
      it('login page should accept valid password + username in databse #integration', function() {
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
      it('login page should reject password + username not in database #integration', function() {
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
      it('users cannot create an account with an empty username, password, or profession #unit', function() {
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


      it('users cannot an account with password and username below length 5 #unit', function() {
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

      it('users should be unable to create accounts with usernames already in database #integration', function() {
          var username = "debug";
          var password = "123";
          var profession = "Debug Mode";
          mysqlDb.query('SELECT * FROM users WHERE username = ?',
			    [username],
			    (error, results, fields) => {
				  if (results.length > 0) {
            expect(results[0].id).to.equal(3);
            expect(results[0].username).to.equal(username);
            expect(results[0].password).to.equal(password);
            expect(results[0].profession).to.equal(profession);
          } else {
            assert.fail("debug user has been removed from database");
          }
          return request(app)
            .post('/creating')
            .type('form')
            .send({
              username: username,
              password: "unique",
              profession: "IDK"
            })
            .then(function(response) {
              expect(response.text).to.contain("Sorry, username is already in use. Choose another");
            })
          });
      });

      it("users should be able to create an account with unique username and length 5+ username/password/profession #integration", function() {
        var username = "wobble"
        var password = "randomPassword"
        var profession = "randomProfession"
        mysqlDb.query('SELECT * FROM users WHERE username = ?',
        username,
        (error, results, fields) => {
        if (results.length > 0) {
          mysqlDb.deleteUser(username)
        }
        }); 
        return request(app)
          .post('/creating')
          .type('form')
          .send({
            username: username,
            password: password,
            profession: profession
          })
          .then(function(response) {
            mysqlDb.query('SELECT * FROM users WHERE username = ?',
            username,
            (error, results, fields) => {
            if (results.length > 0) {
              expect(results[0].username).to.equal(username);
              expect(results[0].password).to.equal(password);
              expect(results[0].profession).to.equal(profession);
            } else {
              assert.fail("User not added to database");
            }
            expect(response.text).to.equal("Found. Redirecting to /select")
            mysqlDb.deleteUser(username)
          });
        });
      });

    describe("Testing Routes", function() {

      it('failure page should return OK status #unit', function()  {
        return request(app)
          .get('/failure')
          .then(function(response) {
              assert.equal(response.status, 200)
          })
      });
  
      
      it('failure page should return message on rendering #unit', function() {
        return request(app)
          .get('/failure')
          .then(function(response) {
              expect(response.text).to.contain('Failure Page');
          })
      });

      it('create account page should render #unit', function() {
        return request(app)
        .get('/create')
        .then(function(response) {
          assert.equal(response.status, 200)
        })
      });
    })

  


  })
})

      
      //User Authentication login(integration)
        //FOR ALL: Google, Linkedin, Facebook
        //Make sure entering a correct account enters user's name as displayName, password as provider, and profession as null