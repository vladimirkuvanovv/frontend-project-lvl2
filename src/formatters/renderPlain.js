import _ from 'lodash';
import {
  ADDED_TYPE, REMOVED_TYPE, CHANGED_TYPE, UNCHANGED_TYPE, NESTED_TYPE,
} from './states.js';

const stringify = (value) => {
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }

  if (_.isObject(value)) {
    return '[complex value]';
  }

  return _.isString(value) ? `'${value}'` : value;
};

const renderPlain = (diff) => {
  const iter = (tree, ancestors) => tree.flatMap((node) => {
    const path = [...ancestors, node.key].join('.');

    switch (node.type) {
      case NESTED_TYPE:
        return `${iter(node.children, [path]).join('\n')}`;
      case CHANGED_TYPE:
        return `Property '${path}' was updated. From ${stringify(node.dataBefore)} to ${stringify(node.dataAfter)}`;
      case REMOVED_TYPE:
        return `Property '${path}' was removed`;
      case ADDED_TYPE:
        return `Property '${path}' was added with value: ${stringify(node.dataAfter)}`;
      case UNCHANGED_TYPE:
        return [];
      default:
        throw new Error(`Type: ${node.type} is undefined`);
    }
  });

  const nodesForPlain = iter(diff, []);
  return [...nodesForPlain].join('\n');
};

export default renderPlain;
