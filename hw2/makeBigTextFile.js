const fs = require('fs');

const writeStream = fs.createWriteStream('mock');

for (let i = 0; i < 1e4; i++) {
  writeStream.write('ab, cb, bss, cb, b, cb, ')
}
