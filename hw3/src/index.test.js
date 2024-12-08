import { main } from './printFsTree.js'

const fullTree =
  `Node.js
├── cluster
│ └── index.js
├── domain
│ └── error.js
│ └── flow.js
│ └── run.js
├── errors
│ └── counter.js
│ └── try-catch.js
└── worker
  └── index.js`;

const levelOneDepthTree =
  `Node.js
├── cluster
├── domain
├── errors
└── worker`;

const emptyFolderTree = `EmptyFolder`;

// remove jest argument --collectCoverage
process.argv.pop();

/* кейс с некорректным кол-вом аргументом вынесен в отдельный describe,
   чтобы в остальных кейсах было удобно сбрасывать аргументы через afterEach
*/
describe('printFsTree invalid arguments', () => {

  it('should throw error if not enough arguments', () => {
    process.argv.push('Node.js');
    expect(() => { main() }).toThrow('Invalid arguments');
  })
});

describe('printFsTree', () => {
  afterEach(() => {
    for (let i = 0; i < 3; i++) {
      process.argv.pop();
    }
  });

  it('should throw error if depth specified incorrectly', () => {
    process.argv.pop();
    process.argv.push('Node.js', '-d', 'k');
    expect(() => { main() }).toThrow('Specify depth correctly');
  })

  it('should throw error if depth specified incorrectly', () => {
    process.argv.push('Node.js', '--depth', 'k');
    expect(() => { main() }).toThrow('Specify depth correctly');
  })

  it('should handle empty folder correctly', () => {
    process.argv.push('EmptyFolder', '-d', '2');
    const tree = main();
    expect(tree).toBe(emptyFolderTree);
  })

  it('should print fullTree', () => {
    process.argv.push('Node.js', '-d', '4');
    const tree = main();
    expect(tree).toBe(fullTree);
  })

  it('should print 1-depth tree', () => {
    process.argv.push('Node.js', '-d', '1');
    const tree = main();
    expect(tree).toBe(levelOneDepthTree);
  })
});
