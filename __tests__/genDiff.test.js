import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/genDiff.js';
import readFile from '../src/readFile.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedFiles = {
  stylish: readFile(getFixturePath('expectedStylish.txt')),
  plain: readFile(getFixturePath('expectedPlain.txt')),
  json: readFile(getFixturePath('expectedJson.txt')),
};

const filesForTests = [
  ['file1.json', 'file2.json', 'stylish'],
  ['file1.yml', 'file2.yml', 'plain'],
  ['file1.json', 'file2.json', 'json'],
];

describe('positive cases', () => {
  test.each(filesForTests)('Compare %s with %s, format %s', (filepath1, filepath2, format) => {
    const file1 = getFixturePath(filepath1);
    const file2 = getFixturePath(filepath2);

    expect(genDiff(file1, file2, format)).toEqual(expectedFiles[format]);
  });
});

describe('negative cases', () => {
  test('Check wrong file extension', () => {
    const error = new Error('unknown file extension txt');

    expect(() => {
      genDiff(getFixturePath('wrong-file1.txt'), getFixturePath('wrong-file2.txt'));
    }).toThrow(error);
  });

  test('Check wrong output format', () => {
    const error = new Error('unknown format txt');

    expect(() => genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'txt')).toThrow(error);
  });
});