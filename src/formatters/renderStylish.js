import _ from 'lodash';
import {
  ADDED_TYPE, REMOVED_TYPE, CHANGED_TYPE, UNCHANGED_TYPE, NESTED_TYPE,
} from './states.js';

const INDENT = '    ';
const EOL = '\n';

const stringify = (value, parentOffset, level = 0) => {
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }

  if (typeof value !== 'object') {
    return value;
  }

  if (value === null) {
    return value;
  }

  parentOffset = level ? parentOffset : INDENT;
  const offset = _.repeat(INDENT, level + 1);

  const keys = Object.keys(value);
  const nestedItem = keys.map((key) => `${parentOffset}${offset}${key}: ${stringify(value[key], parentOffset, level + 1)}`);

  return `{${EOL}${nestedItem.join(EOL)}${EOL}${offset}}`;
};

const buildStylish = (tree, level = 0) => {
  const offset = _.repeat(INDENT, level);

  const stylishNodes = tree.map((node) => {
    switch (node.type) {
      case NESTED_TYPE:
        // eslint-disable-next-line no-case-declarations
        const newChildren = buildStylish(node.children, level + 1);
        return `${INDENT}${offset}${node.key}: ${newChildren}`;
      case UNCHANGED_TYPE:
        return `${offset}${INDENT}${node.key}: ${stringify(node.dataAfter, offset, level)}`;
      case CHANGED_TYPE:
        return `${offset}  - ${node.key}: ${stringify(node.dataBefore, offset, level)}${EOL}${offset}  + ${node.key}: ${stringify(node.dataAfter, offset, level)}`;
      case REMOVED_TYPE:
        return `${offset}  - ${node.key}: ${stringify(node.dataBefore, offset, level)}`;
      case ADDED_TYPE:
        return `${offset}  + ${node.key}: ${stringify(node.dataAfter, offset, level)}`;
      default:
        return `unknown ${node.type}`;
    }
  });

  return `{${EOL}${stylishNodes.join(EOL)}${EOL}${offset}}`;
};

const renderStylish = (tree) => buildStylish(tree);

export default renderStylish;
