var Provider = require('truffle-provider')
var Web3 = require('@nervos/chain').default
var log = require('../dist/utils/log').title('test/util')
const config = require('./config')
const { addressFromPrivateKey } = require('../dist/utils/nervosutils')

const setUpProvider = function(instance, options) {
  log('setUpProvider')
  // options = options || {}
  // Object.assign(options, { logger: { log } })

  return new Promise(function(accept, reject) {
    
    const provider = Provider.create(config.options)
    const web3 = Web3(provider)
    const address = addressFromPrivateKey(config.privateKey, web3)

    instance.setProvider(provider)

    instance.defaults({
      from: address,
    })

    accept({
      web3: web3,
      accounts: [address],
    })
  })
}

// var util = {
//   // Spins up ganache with arbitrary options and
//   // binds web3 & a contract instance to it.
// }

module.exports = {
  setUpProvider,
}