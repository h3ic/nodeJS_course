const { argv } = require('node:process');
const fs = require('node:fs');
const { Transform } = require('node:stream');

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

const textToStringsArr = new Transform({
  readableObjectMode: true,

  transform(chunk, encoding, callback) {
    this.push(chunk.toString().replace('\n', ' ').replace(/[^0-9a-zA-Z ]/g, '').trim().split(' '));
    callback();
  }
});

const stringsArrToCountsObj = new Transform({
  readableObjectMode: true,
  writableObjectMode: true,

  transform(chunk, encoding, callback) {
    const counts = {};

    for (const str of chunk) {
      if (str in counts) {
        counts[str]++;
      } else {
        counts[str] = 1;
      }
    }

    this.push(counts);
    callback();
  }
});

const countsObjToResultArr = new Transform({
  readableObjectMode: true,
  writableObjectMode: true,

  transform(chunk, encoding, callback) {
    const sortedKeys = Object.keys(chunk).sort((a, b) => a.localeCompare(b));

    const resultArr = sortedKeys.reduce((acc, key) => { acc.push(chunk[key]); return acc; }, []);
    this.push(resultArr);
    callback();
  }
});

const resultArrToStr = new Transform({
  writableObjectMode: true,

  transform(chunk, encoding, callback) {
    this.push(JSON.stringify(chunk));
    callback();
  }
});

const main = () => {
  const fileName = validateInputFile();

  const readStream = fs.createReadStream(fileName);
  const writeStream = fs.createWriteStream(fileName + '_result');

  readStream
    .pipe(textToStringsArr)
    .pipe(stringsArrToCountsObj)
    .pipe(countsObjToResultArr)
    .pipe(resultArrToStr)
    .pipe(writeStream);
}

main();
