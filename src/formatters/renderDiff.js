import renderJson from './renderJson.js';
import renderStylish from './renderStylish.js';
import renderPlain from './renderPlain.js';

const renderDiff = (tree, format) => {
  switch (format) {
    case 'json':
      return renderJson(tree);
    case 'plain':
      return renderPlain(tree);
    case 'stylish':
      return renderStylish(tree);
    default:
      throw new Error(`unknown format ${format}`);
  }
};

export default renderDiff;
