//Jan 1st 1970 0:00:00 am

var moment = require(`moment`);

var date = moment();
date.add(1,'y').subtract(2, 'month')
console.log(date.format('MMM Do YYYY')) //outputs SEP

var someTimestamp = moment().valueOf();
console.log(someTimestamp)