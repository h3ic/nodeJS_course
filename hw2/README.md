`streams.js`: работа со всем текстом сразу (подсчет строк вне потоков)
`streamsTransform.js`: подсчет строк в Transform (работает, если текст умещается в один чанк)

```bash
node streams.js 1
# a c b b                   -> [1, 2, 1]
node streams.js 2
# ab cb bss                 -> [1, 1, 1, 1]
node streams.js 3
# ab, cb, bss, cb, b, cb    -> [1, 1, 1, 3]
node streams.js 4
# alex, alex, juan, dima    -> [2, 1, 1]
```
