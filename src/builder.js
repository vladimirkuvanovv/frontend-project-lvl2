import _ from 'lodash';
import {
  ADDED_TYPE, REMOVED_TYPE, CHANGED_TYPE, UNCHANGED_TYPE, NESTED_TYPE,
} from './formatters/states.js';

const buildNode = (key, type, dataBefore = null, dataAfter = null, children = {}) => ({
  key,
  type,
  dataBefore,
  dataAfter,
  children,
});

const buildTree = (dataBefore, dataAfter) => {
  const dataBeforeKeys = Object.keys(dataBefore);
  const dataAfterKeys = Object.keys(dataAfter);
  const uniqueKeys = _.sortBy(_.union(dataBeforeKeys, dataAfterKeys));

  return uniqueKeys.map((key) => {
    // eslint-disable-next-line no-prototype-builtins
    if (!dataBefore.hasOwnProperty(key)) {
      return buildNode(key, ADDED_TYPE, null, dataAfter[key]);
    }

    // eslint-disable-next-line no-prototype-builtins
    if (!dataAfter.hasOwnProperty(key)) {
      return buildNode(key, REMOVED_TYPE, dataBefore[key]);
    }

    if (typeof dataBefore[key] === 'object' && typeof dataAfter[key] === 'object') {
      return buildNode(key, NESTED_TYPE, null, null, buildTree(dataBefore[key], dataAfter[key]));
    }

    if (dataBefore[key] !== dataAfter[key]) {
      return buildNode(key, CHANGED_TYPE, dataBefore[key], dataAfter[key]);
    }

    return buildNode(key, UNCHANGED_TYPE, dataBefore[key], dataAfter[key]);
  });
};

export default buildTree;
