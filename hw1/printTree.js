/*
 Пример:

  1
  ├── 2
  │ └── 3
  │ └── 4
  └── 5
    └── 6
*/
export const printTree = (root) => {
  if (root.name === undefined) {
    return;
  }

  let res = '';
  let stack = [root];
  let currDepth = 0;
  const nodesLeftToTraverseAtEachDepth = { 1: 1 };

  while (true) {
    if (stack.length === 0) {
      return res;
    }

    let currNode = stack.pop();
    nodesLeftToTraverseAtEachDepth[currDepth]--;

    // Отрисовываем строку с текущей нодой
    if (currDepth === 0) {
      res += currNode.name.toString();
    } else if (currDepth === 1) {
      const firstSymbol = nodesLeftToTraverseAtEachDepth[currDepth] > 0 ? '├' : '└';
      res += `\n${firstSymbol}── ${currNode.name}`;
    } else {
      const firstSymbol = nodesLeftToTraverseAtEachDepth[1] > 0 ? '│' : ' ';

      /*
        Глубина               0 1 2 3 4 5
        Количество пробелов   0 0 1 3 5 7
      */
      const spaces = ' '.repeat(currDepth * 2 - 3);

      res += `\n${firstSymbol}${spaces}└── ${currNode.name}`;
    }

    // Если у текущей ноды нет дочерних нод (достигли максимальной глубины)
    if (!currNode.items || currNode.items.length === 0) {
      // Если посетили все ноды на текущем уровне, поднимаемся на предыдущую глубину
      if (nodesLeftToTraverseAtEachDepth[currDepth] === 0) {
        currDepth--;
      }
      continue;
    }

    // Если у текущей ноды есть дочерние ноды, добавляем их в стек и переходим на следующую глубину
    const reversedItems = currNode.items.reverse();

    for (const childNode of reversedItems) {
      stack.push(childNode);
    }

    currDepth++;
    nodesLeftToTraverseAtEachDepth[currDepth] = currNode.items.length;
  }
}
