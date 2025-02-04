import generateStupidName from 'sillyname';
import { randomSuperhero } from 'superheroes';
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([
    {
      message: 'What is your name?',
      name: 'act2',
    },
  ])
  .then((answers) => {
    const ss = generateStupidName();
    const sh = randomSuperhero();

    console.log('Hello', answers.act2);
    console.log('Your villain name will be', sh);
    console.log('And your superhero name will be', ss);

    const content = `${answers.act2} ${ss} ${sh}`;

    const qr_png = qr.image(answers.act2, { type: 'png' });
    const qr_png1 = qr.image(sh, { type: 'png' });
    const qr_png2 = qr.image(ss, { type: 'png' });

    qr_png.pipe(fs.createWriteStream('name.png'));
    qr_png1.pipe(fs.createWriteStream('superheroname.png'));
    qr_png2.pipe(fs.createWriteStream('sillyname.png'));

    fs.writeFile('myhero.txt', content, (err) => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log('File has been written successfully');
      }
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
