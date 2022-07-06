import yaml from 'js-yaml';

const parse = (extension, content) => {
  switch (extension) {
    case 'json':
      return JSON.parse(content);
    case 'yml':
    case 'yaml':
      return yaml.load(content);
    default:
      throw new Error(`unknown file extension ${extension}`);
  }
};

export default parse;
