const fs = require('fs');
const path = require('path');

const pathDir = path.join(__dirname);
const pathesFiles = [];

fs.readdir(pathDir, 'utf-8', (err, files) => {
  files.forEach((file) => {
    fs.stat(path.join(pathDir, file), (err, stats) => {
      if (stats.isDirectory() && file === 'styles') {
        pathesFiles.push(path.join(pathDir, file));
      }
      console.log(pathesFiles);
    });
  });
});
