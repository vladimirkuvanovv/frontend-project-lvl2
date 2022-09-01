import _ from 'lodash';
import {
  ADDED_TYPE,
  REMOVED_TYPE,
  CHANGED_TYPE,
  UNCHANGED_TYPE,
  NESTED_TYPE,
} from './states.js';

const EOL = '\n';

const stringify = (value, level, replacer) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }

  const indentForKey = replacer.repeat(level + 1);
  const indentForBracket = replacer.repeat(level);
  const lines = Object
    .entries(value)
    .map(([key, data]) => `${indentForKey}${key}: ${stringify(data, level + 1, replacer)}`);

  return ['{', ...lines, `${indentForBracket}}`].join(EOL);
};

const sign = {
  ADDED_TYPE: '+',
  REMOVED_TYPE: '-',
  UNCHANGED_TYPE: ' ',
};

const renderStylish = (diff, replacer = '    ') => {
  const iter = (tree, level) => tree.map((node) => {
    const indent = replacer.repeat(level);
    const indentForSign = indent.slice(2);

    const makeLine = (value, mark) => `${indentForSign}${mark} ${node.key}: ${stringify(value, level, replacer)}`;

    switch (node.type) {
      case NESTED_TYPE:
        return `${indent}${node.key}: ${['{', ...iter(node.children, level + 1), `${indent}}`].join(EOL)}`;
      case ADDED_TYPE:
        return makeLine(node.dataAfter, sign.ADDED_TYPE);
      case REMOVED_TYPE:
        return makeLine(node.dataBefore, sign.REMOVED_TYPE);
      case UNCHANGED_TYPE:
        return makeLine(node.dataBefore, sign.UNCHANGED_TYPE);
      case CHANGED_TYPE:
        return [`${makeLine(node.dataBefore, sign.REMOVED_TYPE)}`,
          `${makeLine(node.dataAfter, sign.ADDED_TYPE)}`].join('\n');
      default:
        throw new Error(`Type: ${node.type} is undefined`);
    }
  });

  const stylishDiff = iter(diff, 1);
  return ['{', ...stylishDiff, '}'].join('\n');
};

export default renderStylish;
