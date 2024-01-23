const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname);
const outputPath = path.join(baseDir, 'project-dist', 'bundle.css');
const stylesDir = path.join(baseDir, 'styles');
const testStylesDir = path.join(baseDir, 'test-files', 'styles');

let array = [];

const processStyles = (folderPath) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    files.forEach((file) => {
      const filePath = path.join(folderPath, file);

      fs.readFile(filePath, 'utf-8', (err, content) => {
        if (err) {
          console.error(`Error reading file ${filePath}: ${err}`);
          return;
        }

        if (path.extname(file) === '.css') {
          array.push(content);
          fs.writeFile(outputPath, array.join('\n'), 'utf-8', (err) => {
            if (err) {
              console.error(`Error writing to ${outputPath}: ${err}`);
            }
          });
        }
      });
    });
  });
};

const arrOfStyles = () => {
  processStyles(stylesDir);
};

const arrOfStylesFromTestFiles = () => {
  processStyles(testStylesDir);
};

arrOfStylesFromTestFiles();
arrOfStyles();
