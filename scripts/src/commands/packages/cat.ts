import as, { type AnsiColors } from 'ansis';
import { Command } from 'commander';

export const cat = new Command('cat')
  .description('Cat to test your terminal color output')
  .action(async () => {
    const p = (val: string, c: AnsiColors) => console.log(as[c](val));

    // ASCII Art Cat with more medium and gravity visualized

    // A larger, more detailed cat with a sense of weight and presence
    const catArt = [
      '           /\\     /\\',
      "          {  `---'  }",
      '          {  O   O  }',
      '          ~~>  V  <~~',
      '           \\  \\|/  /',
      "            `-----'____",
      '            /     \\    \\_',
      '           {       }\\  )_\\_   _',
      '           |  ||  |\\ \\___/ )_/',
      '           (_(__)_| )____/ ((',
      '            /     ((',
      '           (       )',
      "            `-._.-'",
    ];

    // Color stripes for the cat
    const colors: AnsiColors[] = [
      'white',
      'whiteBright',
      'gray',
      'grey',
      'black',
      'blackBright',
      'red',
      'redBright',
      'green',
      'greenBright',
      'yellow',
      'yellowBright',
      'blue',
      'blueBright',
      'magenta',
      'magentaBright',
      'cyan',
      'cyanBright',
    ];

    // Print color stripes
    colors.forEach(color => {
      p('████████████████████████████████████████', color);
    });

    // Print the cat art in magentaBright
    catArt.forEach(line => p(line, 'magentaBright'));

    // Print color stripes again
    colors
      .slice()
      .reverse()
      .forEach(color => {
        p('████████████████████████████████████████', color);
      });

    p('I am very red', 'red');
    p('I am very yellow', 'yellow');
    p('I am very green', 'green');
    p('I am very cyan', 'cyan');
    p('I am very blue', 'blue');
    p('I am very magenta', 'magenta');
    p('I am very white', 'white');
    p('I am very black', 'black');
    p('I am very redBright', 'redBright');
    p('I am very yellowBright', 'yellowBright');
    p('I am very greenBright', 'greenBright');
    p('I am very cyanBright', 'cyanBright');
    p('I am very blueBright', 'blueBright');
    p('I am very magentaBright', 'magentaBright');
    p('I am very whiteBright', 'whiteBright');
    p('I am very blackBright', 'blackBright');
    p('I am very gray', 'gray');
    p('I am very grey', 'grey');
  });
