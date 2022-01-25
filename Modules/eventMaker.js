

let eventEmitter = require('../eventEmitter.js')

orders = [
  {
    store: 'Mya\'s Munchies',
    orderID: 'e3669048-7313-427b-b6cc-74010ca1f8f0',
    customer: 'Kellen Linse',
    address: 'Seattle, WA'
  }
]

function eventMaker(){
  eventEmitter.emit('order-made', orders[0]);
}

module.exports = eventMaker;