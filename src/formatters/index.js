import renderJson from './renderJson.js';
import renderStylish from './renderStylish.js';
import renderPlain from './renderPlain.js';

export default (tree, format) => {
  switch (format) {
    case 'json':
      return renderJson(tree);
    case 'plain':
      return renderPlain(tree);
    default:
      return renderStylish(tree);
  }
};
