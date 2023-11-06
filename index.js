const fs = require('fs');
const inquirer = require('inquirer');
const { Triangle, Circle, Square } = require('./lib/shapes.js');

const questions = [
  {
    name: 'text',
    message: 'Logo text: ',
    type: 'input',
    validate: (text) => {
      if (text.length > 3) {
        return 'Please provide a logo text with maximum 3 characters';
      }

      return true;
    },
  },
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
        value: 'square'
      }
    ],
  },
  { name: 'shapeColor', message: 'Shape\'s color: ' },
];

function writeToFile(fileName, answers) {
  let svg = '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';

  switch (answers.shape) {
    case 'triangle': {
      const shape = new Triangle();
      shape.setColor(answers.shapeColor);
      svg += shape.render();
      svg += `<text x="150" y="170" font-size="60" text-anchor="middle" fill="${answers.textColor}">${answers.text}</text>`;
      break;
    }

    case 'circle': {
      const shape = new Circle();
      shape.setColor(answers.shapeColor);
      svg += shape.render();
      svg += `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${answers.textColor}">${answers.text}</text>`;
      break;
    }

    case 'square': {
      const shape = new Square();
      shape.setColor(answers.shapeColor);
      svg += shape.render();
      svg += `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${answers.textColor}">${answers.text}</text>`;
      break;
    }
  }

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