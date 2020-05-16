const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const app = require('../app');
const db = require('./../mysqlConn')

describe("Unit test for databse functions", function() {

  //unit test
  it("should return matching users #unit", function() {
    //insert several users into database
    //use query command based on username/profession
    //check that results match individually with assert
  });

  it("should insert users into databse #unit", function() {
    return request(app)
    //first check that user is not in databse
    //use insertIntoDataBase command
    //comfirm that user in in databse
    
  });
  
  it("should delete user with specified user name #unit", function() {
    //first check that user is not in databse
    //use insertIntoDataBase command
    //comfirm that user in in databse
    //delete user from databse
    //confirm that user is not in database
  });

  it("should return json list of user data with matching username #db", function() {
    var username = 'debug'
    db.searchForUserName(username);
    console.log(db.searchForUserName(username));

  });

});
