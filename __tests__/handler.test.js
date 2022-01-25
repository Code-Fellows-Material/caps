let driverEvent = require('../Modules/driverEvent');
let vendorEvent = require('../Modules/vendorEvent');

orders = [
  {
    store: 'Mya\'s Munchies',
    orderID: 'e3669048-7313-427b-b6cc-74010ca1f8f0',
    customer: 'Kellen Linse',
    address: 'Seattle, WA'
  }
]



describe('Event Handler Tests', () => {

  it('creates orders', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    driverEvent(orders[0]);
  
    expect(consoleSpy).toHaveBeenCalledWith('DRIVER: delivered');
  })
  it('creates orders', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    vendorEvent(orders[0]);
  
    expect(consoleSpy).toHaveBeenCalledWith('VENDOR: start pickup');
  })
})