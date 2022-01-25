let eventEmitter = require('../eventEmitter.js')

eventEmitter.on('delivered', (order) => {
  console.log('VENDOR: Thank you,', order.customer, 'from,', order.store, '\n');
})

function vendorEvent(order){
  console.log('VENDOR: start pickup');
  console.log('ORDER_ID:', order.orderID, '\n');
  eventEmitter.emit('pickup', order)
}

module.exports = vendorEvent;