'use strict'

const fs = require('fs')
const path = require('path')
const AdBlockClient = require('adblock-rs')

const client = new AdBlockClient.Engine([], false)

//const file = path.resolve(__dirname, 'detector.buffer');

module.exports.initialize = async () => {
  /*new Promise((resolve, reject) => {
fs.readFile(file, (err, buffer) => {
  if (err) { return reject(err); }
  client.deserialize(buffer);
  return resolve();
});
});*/
}

module.exports.containsAds = (url, type, debug) => {
  client.check(url, type, debug)
}
