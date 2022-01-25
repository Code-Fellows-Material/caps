'use strict'

let eventEmitter = require('../eventEmitter.js')
let eventMaker = require('./eventMaker')
let driverEvent = require('./driverEvent');
let vendorEvent = require('./vendorEvent');

var d = new Date();

eventEmitter.on('order-made', (order) => {
  vendorEvent(order)
})

eventEmitter.on('in-transit', (order) => {
  console.log('EVENT:', {
    event: 'in-transit',
    time: formatDate(d),
    order: order
  });
  driverEvent(order)
})


eventMaker();


// Helper Functions 


// https://stackoverflow.com/questions/25275696/javascript-format-date-time/25276435
function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return ( strTime + " " + date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
}