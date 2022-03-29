import renderJson from './renderJson.js';
import renderPretty from './renderPretty.js';

const renderDiff = (tree, format) => {
  switch (format) {
    case 'json':
      return renderJson(tree);
    case 'plain':
      break;
    case 'pretty':
      return renderPretty(tree);
      break;
    default:
      throw new Error(`unknown format ${format}`);
  }
};

export default renderDiff;
