const fs = require('fs');
const inquirer = require('inquirer');

const questions = [
  { name: 'text', message: 'Logo text: ' },
  { name: 'textColor', message: 'Text color: ' },
  {
    name: 'shape',
    type: 'list',
    message: 'Shape: ',
    choices: [
      {
        name: 'Triangle',
        value: 'triangle'
      }, {
        name: 'Circle',
        value: 'circle'
      }, {
        name: 'Square',
        value: 'Square'
      }
    ],
  },
  { name: 'shapeColor', message: 'Shape\'s color: ' },
];

function writeToFile(fileName, answers) {
  let svg = '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
  svg += '</svg>';


  fs.writeFile(fileName, svg , function(error) {
    if (error) {
      throw error;
    }

    console.log('\nGenerated ' + fileName + '\n');
  });
}

function init() {
inquirer
  .prompt(questions)
  .then((answers) => {
    writeToFile('logo.svg', answers);
  })
  .catch((error) => {
    console.log(error);
  });
}

init();