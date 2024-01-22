const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '/text.txt');
fs.readFile(file, 'utf-8', (err, data) => {
  console.log(data);
});
