/**
 * Created by Zhang Mingze on 2016/3/29.
 */

var config = require('../../config/index');
var  Db = require('mongodb').Db;
var  Server = require('mongodb').Server;
var  Connection = require('mongodb').Connection;

module.exports = new Db(config.mongo.db, 
  new Server(config.mongo.host, config.mongo.port), 
  {safe: true});

