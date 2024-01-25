const fs = require('fs');
const path = require('path');

const pathFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathFolder, 'utf-8', (err, files) => {
  if (err) {
    throw err;
  }
  files.forEach((file) => {
    fs.stat(path.join(pathFolder, `${file}`), (err, stats) => {
      const fileName = path.basename(file, path.extname(file));
      if (err) throw err;
      if (stats.isFile()) {
        console.log(
          `File: ${fileName} - file extension: ${
            path.extname(file).split('.')[1]
          } - file size: ${stats.size}`,
        );
      }
    });
  });
});
