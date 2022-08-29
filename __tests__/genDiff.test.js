import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/genDiff.js';
import readFile from '../src/readFile.js';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedFiles = {
  stylish: readFile(getFixturePath('expectedStylish.txt')),
  // stylish: readFile(getFixturePath('stylish')),
  // plain: readFile('expected_plain'),
  // json: readFile('expected_json'),
};

const filesForTests = [
  ['file1.json', 'file2.json', 'stylish'],
  ['file1.yml', 'file2.yml', 'stylish'],
  // ['file1.json', 'file2.yaml', 'json'],
];

describe('genDiff', () => {
  test.each(filesForTests)('Compare %s with %s, format %s', (filepath1, filepath2, format) => {
    const file1 = getFixturePath(filepath1);
    const file2 = getFixturePath(filepath2);

    expect(genDiff(file1, file2, format)).toEqual(expectedFiles[format]);
  });
});
