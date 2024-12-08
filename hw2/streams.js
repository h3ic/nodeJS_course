const { argv } = require('node:process');
const fs = require('node:fs');

const validateInputFile = () => {
  const userArgs = argv.slice(2);

  if (userArgs.length === 0) {
    throw Error('please specify a filename');
  }

  const fileName = userArgs[0];

  const stats = fs.statSync(fileName);

  if (stats.isDirectory()) {
    throw Error('file should not be a directory');
  }

  return fileName;
}

const getStringsCount = (text) => {
  const counts = {};

  const spaceDividedText = text.replace('\n', ' ').replace(/[^0-9a-zA-Z ]/g, '').trim();
  const strings = spaceDividedText.split(' ');

  for (const str of strings) {
    if (str in counts) {
      counts[str]++;
    } else {
      counts[str] = 1;
    }
  }

  const sortedKeys = Object.keys(counts).sort((a, b) => a.localeCompare(b));

  return sortedKeys.reduce((acc, strKey) => { acc.push(counts[strKey]); return acc; }, []);
}

const main = () => {
  const fileName = validateInputFile();

  const readStream = fs.createReadStream(fileName);
  let data = '';

  readStream.on('data', (chunk) => {
    data += chunk;
  })

  readStream.on('end', () => {
    const stringsCount = getStringsCount(data);
    const writeStream = fs.createWriteStream(fileName + '_result');
    writeStream.write(JSON.stringify(stringsCount));
  })

}

main();
