import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/genDiff.js';
import readFile from '../src/readFile.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedFiles = {
  pretty: readFile(getFixturePath('expectedPretty')),
};

const filesForTests = [
  ['file1.json', 'file2.json', 'pretty'],
  ['file1.yml', 'file2.yml', 'pretty'],
];

describe('genDiff', () => {
  test.each(filesForTests)('Compare %s with %s, format %s', (filepath1, filepath2, format) => {
    const file1 = getFixturePath(filepath1);
    const file2 = getFixturePath(filepath2);

    expect(genDiff(file1, file2, format)).toEqual(expectedFiles[format]);
  });
});
