import path from 'path';
import parse from './parsers.js';
import buildTree from './builder.js';
import renderDiff from './formatters/index.js';
import readFile from './readFile.js';

const getFileExtension = (pathToFile) => path.extname(pathToFile).slice(1);

const genDiff = (pathToFileBefore, pathToFileAfter, format) => {
  const contentFromFileBefore = readFile(pathToFileBefore);
  const contentFromFileAfter = readFile(pathToFileAfter);

  const extensionFileBefore = getFileExtension(pathToFileBefore);
  const extensionFileAfter = getFileExtension(pathToFileAfter);

  const contentFileBefore = parse(extensionFileBefore, contentFromFileBefore);
  const contentFileAfter = parse(extensionFileAfter, contentFromFileAfter);

  const tree = buildTree(contentFileBefore, contentFileAfter);

  return renderDiff(tree, format);
};

export default genDiff;
