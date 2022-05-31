import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/genDiff.js';
import readFile from '../src/readFile.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('genDiff', () => {
  test('genDiff', () => {
    expect(genDiff(getFixturePath('before.json'), getFixturePath('after.json'))).toBe(readFile(getFixturePath('simple_expected')));
  });
});
