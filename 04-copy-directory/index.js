const fs = require('fs');
const path = require('path');

const pathFolder = path.join(__dirname, 'files');
const pathCopyFolder = path.join(__dirname, 'files-copy');

fs.mkdir(pathCopyFolder, { recursive: true }, (err) => {
  if (err) {
    console.log(err, 'Error');
  }
  fs.readdir(pathFolder, 'utf-8', (err, files) => {
    if (err) {
      console.log('Error');
    }

    files.forEach((file) => {
      fs.copyFile(
        path.join(pathFolder, `${file}`),
        path.join(pathCopyFolder, `${file}`),
        (err) => {
          if (err) {
            console.log(err);
          }
        },
      );
    });
    console.log('Сopied');
  });
});
