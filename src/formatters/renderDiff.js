import renderJson from './renderJson.js';
import renderStylish from "./renderStylish.js";

const renderDiff = (tree, format) => {
  switch (format) {
    case 'json':
      return renderJson(tree);
    case 'plain':
      break;
    case 'stylish':
      return renderStylish(tree);
    default:
      throw new Error(`unknown format ${format}`);
  }
};

export default renderDiff;
