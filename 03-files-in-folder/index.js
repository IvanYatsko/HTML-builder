const fs = require('fs');
const path = require('path');

const pathFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathFolder, 'utf-8', (err, files) => {
  console.log(files);
  if (err) {
    throw err;
  }
  files.forEach((file) => {
    fs.stat(path.join(pathFolder, `${file}`), (err, stats) => {
      if (err) throw err;
      if (stats.isFile()) {
        console.log(
          `File: ${file} - file extension: ${path.extname(file)} - file size: ${
            stats.size
          }`,
        );
      }
    });
  });
});
