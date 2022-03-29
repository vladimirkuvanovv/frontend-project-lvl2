import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildTree from "./builder.js";
import renderDiff from "./formatters/renderDiff.js";

const getFileExtension = (pathToFile) => path.extname(pathToFile).split('.').pop();

const genDiff = (pathToFileBefore, pathToFileAfter, format = 'pretty') => {
    const contentFromFileBefore = fs.readFileSync(pathToFileBefore, 'utf8');
    const contentFromFileAfter = fs.readFileSync(pathToFileAfter, 'utf8');
    
    const extensionFileBefore = getFileExtension(pathToFileBefore);
    const extensionFileAfter = getFileExtension(pathToFileAfter);

    const contentFileBefore = parse(extensionFileBefore, contentFromFileBefore);
    const contentFileAfter = parse(extensionFileAfter, contentFromFileAfter);

    const tree = buildTree(contentFileBefore, contentFileAfter);
    // console.log(tree);

    // return;
    console.log(renderDiff(tree, format));
    // console.log(path.resolve());
    return;
    // console.log(contentFromFileBefore);
    // console.log(extensionFileBefore);
    // console.log(contentFileBefore);
};

export default genDiff;