const fs = require('fs');
const path = require('path');

const pathProjectDist = path.join(__dirname, 'project-dist');
const pathStyleFolder = path.join(__dirname, 'styles');
const pathStyleFile = path.join(pathProjectDist, 'style.css');
const pathAssetsFolder = path.join(__dirname, 'assets');
const components = path.join(__dirname, 'components');
const template = path.join(__dirname, 'template.html');

const replaceContent = () => {
  fs.readFile(template, 'utf-8', (_err, code) => {
    fs.readdir(components, (err, files) => {
      console.log(err);
      let codeContent = code;
      files.forEach((file) => {
        const replaceItem = file.split('.')[0];
        if (path.extname(file) === '.html') {
          fs.readFile(path.join(components, file), 'utf-8', (_err, content) => {
            codeContent = codeContent.replaceAll(`{{${replaceItem}}}`, content);
            fs.writeFile(
              path.join(pathProjectDist, 'index.html'),
              codeContent,
              'utf-8',
              (err) => {
                console.log(err);
              },
            );
          });
        }
      });
    });
  });
};

const copyStyles = () => {
  fs.readdir(pathStyleFolder, (err, files) => {
    console.log(err);
    files.forEach((file) => {
      if (path.extname(file) === '.css') {
        let arrContent = [];
        fs.readFile(
          path.join(pathStyleFolder, file),
          'utf-8',
          (_err, content) => {
            arrContent.push(content);
            fs.writeFile(
              pathStyleFile,
              arrContent.join('\n'),
              'utf-8',
              (err) => {
                console.log(err);
              },
            );
          },
        );
      }
    });
  });
};

const copyAssets = () => {
  fs.mkdir(path.join(pathProjectDist, 'assets'), { recursive: true }, (err) => {
    console.log(err);
  });

  fs.readdir(pathAssetsFolder, (err, folders) => {
    console.log(err);
    folders.forEach((folder) => {
      fs.readdir(path.join(pathAssetsFolder, folder), (err, files) => {
        console.log(err);
        fs.mkdir(
          path.join(pathProjectDist, 'assets', folder),
          { recursive: true },
          (err) => {
            console.log(err);
          },
        );
        fs.readdir(
          path.join(pathProjectDist, 'assets', `${folder}`),
          (_err, copyFiles) => {
            copyFiles.forEach((file) => {
              if (!files.includes(file)) {
                fs.unlink(
                  path.join(pathProjectDist, 'assets', folder, file),
                  (err) => {
                    console.log(err);
                  },
                );
              }
            });
          },
        );

        files.forEach((file) => {
          fs.copyFile(
            path.join(pathAssetsFolder, folder, file),
            path.join(path.join(pathProjectDist, 'assets'), folder, file),
            (err) => {
              console.log(err);
            },
          );
        });
      });
    });
  });
};

const createProject = () => {
  fs.mkdir(pathProjectDist, { recursive: true }, (err) => {
    console.log(err);
  });
};

const copy = () => {
  createProject();
  copyAssets();
  copyStyles();
  replaceContent();
};

copy();
