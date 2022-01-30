let vendor = require('../clients/vendor');
let delivery = require('../clients/delivery');

orders = [
  {
    store: 'Mya\'s Munchies',
    orderID: 'e3669048-7313-427b-b6cc-74010ca1f8f0',
    customer: 'Kellen Linse',
    address: 'Seattle, WA'
  }
]



describe('Event Handler Tests', () => {

  it('creates orders', (done) => {
    let consoleSpy = jest.spyOn(console, 'log');

    vendor.log('test');
  
    expect(consoleSpy).toHaveBeenCalled();
    done();
  })

  it('logger', (done) => {
    let consoleSpy = jest.spyOn(console, 'log');

    delivery.log('test');
  
    expect(consoleSpy).toHaveBeenCalled();
    done();
  })
})