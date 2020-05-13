const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const app = require('../app');

      //Database unit tests
        //Make sure query, insert, and delete work