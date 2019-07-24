'use strict'

const fs = require('fs').promises
const path = require('path')
const AdBlockClient = require('adblock-rs')

module.exports.initialize = async () => {
  let rules = []
  let lists = await Promise.all([
    fs.readFile(path.join(__dirname, '../lists/easylist.txt'), 'utf8'),
    fs.readFile(path.join(__dirname, '../lists/unbreak.txt'), 'utf8'),
    fs.readFile(path.join(__dirname, '../lists/miners.txt'), 'utf8')
  ])

  lists.forEach(list => { rules = rules.concat(list.split('\n')) })

  const client = new AdBlockClient.Engine(rules, false)
  client.updateResources(await fs.readFile(path.join(__dirname, '../lists/resources.txt'), 'utf8'))

  lists = null
  rules = null

  return client
}
/*
module.exports.initialize().then(client => {
  console.log(client.check('http://example.com/-advertisement-icon.', 'http://example.com/helloworld', 'image'))
  console.log(client.check('http://example.com/-advertisement-icon.', 'http://example.com/helloworld', 'image'))
  console.log(client.check('https://bbci.co.uk/test/analytics.js', 'https://bbc.co.uk', 'script'))
})
*/