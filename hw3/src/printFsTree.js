import { argv } from 'node:process';
import fs from 'node:fs';
import path from 'node:path';
import { printTree } from './printTree.js';

const getTreeConfig = () => {
  const config = {};

  console.log(argv);
  const userArgs = argv.slice(2);

  if (userArgs.length === 3) {
    fs.stat(userArgs[0], (err) => { })

    config.fileName = userArgs[0];

    const parsedDepthArg = parseInt(userArgs[2]);

    if ((userArgs[1] === '-d' || userArgs[1] === '--depth') && Number.isInteger(parsedDepthArg)) {
      config.depth = parsedDepthArg;
    } else {
      throw Error('Specify depth correctly')
    }
  } else {
    throw Error('Invalid arguments')
  }

  return config;
}

/*
 * Возвращает дерево, где нода - объект вида { name: '1', items: [ { name: '2' }, { name: '3' } ] }
 */
const turnFileIntoTreeObj = ({ fileName, depth }) => {
  const item = { name: path.basename(fileName) };
  const stats = fs.statSync(fileName);

  if (stats.isDirectory() && depth > 0) {
    const childFiles = fs.readdirSync(fileName)
    if (childFiles.length > 0) {
      item.items = childFiles.map(childFileName => turnFileIntoTreeObj({ fileName: `${fileName}/${childFileName}`, depth: depth - 1 }));
    }
  }

  return item;
}

/*
 Пример:

Node.js
├── cluster
│ └── index.js
├── domain
│ ├── error.js
│ ├── flow.js
│ └── run.js
├── errors
│ ├── counter.js
│ └── try-catch.js
└── worker
  └── index.js
*/
export const main = () => {
  const config = getTreeConfig();
  const tree = turnFileIntoTreeObj(config);
  const printed = printTree(tree);
  console.log(printed);
  return printed;
}
