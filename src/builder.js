import _ from 'lodash';
import {
  ADDED_TYPE, REMOVED_TYPE, CHANGED_TYPE, UNCHANGED_TYPE,
} from './formatters/states.js';

const buildTree = (dataBefore, dataAfter) => {
  const dataBeforeKeys = Object.keys(dataBefore);
  const dataAfterKeys = Object.keys(dataAfter);
  const uniqueKeys = _.sortBy(_.union(dataBeforeKeys, dataAfterKeys));

  return uniqueKeys.map((key) => {
    if (!dataBefore.hasOwnProperty(key)) {
      return buildNode(key, ADDED_TYPE, null, dataAfter[key]);
    }

    if (!dataAfter.hasOwnProperty(key)) {
      return buildNode(key, REMOVED_TYPE, dataBefore[key]);
    }

    if (dataBefore[key] !== dataAfter[key]) {
      return buildNode(key, CHANGED_TYPE, dataBefore[key], dataAfter[key]);
    }

    return buildNode(key, UNCHANGED_TYPE, dataBefore[key], dataAfter[key]);
  });
};

const buildNode = (key, type, dataBefore = null, dataAfter = null, children = {}) => ({
  key,
  type,
  dataBefore,
  dataAfter,
  children,
});

export default buildTree;
