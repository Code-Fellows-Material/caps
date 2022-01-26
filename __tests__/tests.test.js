let vendor = require('../clients/vendor');
let delivery = require('../clients/delivery');
const { doesNotMatch, doesNotReject } = require('assert');

orders = [
  {
    store: 'Mya\'s Munchies',
    orderID: 'e3669048-7313-427b-b6cc-74010ca1f8f0',
    customer: 'Kellen Linse',
    address: 'Seattle, WA'
  }
]



describe('Event Handler Tests', () => {

  it('creates orders', async (done) => {
    console.log(vendor)
    let consoleSpy = jest.spyOn(vendor, 'log');

    vendor.log(orders[0].orderID);
  
    expect(consoleSpy).toHaveBeenCalled();
    done();
  })
  it('logger', async (done) => {
    let consoleSpy = jest.spyOn(delivery, 'log');

    delivery.log(orders[0].orderID);
  
    expect(consoleSpy).toHaveBeenCalled();
    done();
  })
})