let eventEmitter = require('../eventEmitter.js')

eventEmitter.on('pickup', (order) => {
  console.log('DRIVER: picked up - ORDER_ID:', order.orderID, '\n');
  eventEmitter.emit('in-transit', order);
})

function driverEvent(order){
  console.log('DRIVER: delivered');
  console.log('ORDER_ID:', order.orderID, '\n');
  eventEmitter.emit('delivered', order);
}

module.exports = driverEvent;