import _ from 'lodash';
import {
  ADDED_TYPE, REMOVED_TYPE, CHANGED_TYPE, UNCHANGED_TYPE,
} from './states.js';

const INDENT = '  ';
const EOL = '\n';

const renderPretty = (tree) => buildPretty(tree);

const buildPretty = (tree, level = 0) => {
  const offset = _.repeat(INDENT, level);

  console.log(offset);
  const prettyNodes = tree.map((node) => {
    switch (node.type) {
      case UNCHANGED_TYPE:
        return `${INDENT}  ${offset}${node.key}: ${node.dataBefore}`;
      case CHANGED_TYPE:
        return `${offset
        }  - ${node.key}: ${node.dataBefore}${EOL
        }  + ${node.key}: ${node.dataAfter}`;
      case REMOVED_TYPE:
        return `${offset}  - ${node.key}: ${node.dataBefore}`;
      case ADDED_TYPE:
        return `${offset}  + ${node.key}: ${node.dataAfter}`;
    }
  });

  return '{' + `\n${prettyNodes.join('\n')}\n` + '}';
};

export default renderPretty;
