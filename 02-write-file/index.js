const fs = require('fs');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const path = require('path');

const rl = readline.createInterface({ input, output });

const update = (answer) => {
  if (answer.toLocaleLowerCase() === 'exit') {
    rl.close();
  } else {
    fs.appendFile(path.join(__dirname, 'text.txt'), answer, (err) => {
      if (err) throw err;
    });
    rl.setPrompt('Anything else? ');
    rl.prompt();
  }
};

rl.question('What do you whant to write? ', (answer) => {
  update(answer);
});

rl.on('line', (answer) => {
  update(answer);
});
rl.on('close', () => {
  console.log('\nThe file was update!');
  process.exit();
});
