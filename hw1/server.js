import fs from 'node:fs';
import { printTree } from "./printTree.js";

// Оригинальный пример
const data = JSON.parse(fs.readFileSync('./data/data.json'));
// Пример с одной нодой на глубине 1
const data2 = JSON.parse(fs.readFileSync('./data/data2.json'));
// Пример дерева из одной ноды
const data3 = JSON.parse(fs.readFileSync('./data/data3.json'));
// Пример дерева с большой глубиной
const data4 = JSON.parse(fs.readFileSync('./data/data4.json'));

console.log('Пример 1: \n\n', printTree(data) + '\n');
console.log('Пример 2: \n\n', printTree(data2) + '\n');
console.log('Пример 3: \n\n', printTree(data3) + '\n');
console.log('Пример 4: \n\n', printTree(data4) + '\n');
