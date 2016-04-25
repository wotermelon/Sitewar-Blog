/**
 * Created by Zhang Mingze on 2016/3/29.
 */

var config = require('../../config/index'),
    Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;

module.exports = new Db(config.mongo.db, 
  new Server(config.mongo.host, config.mongo.port), 
  {safe: true});