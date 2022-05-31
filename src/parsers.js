const parse = (extension, content) => {
  switch (extension) {
    case 'json':
      return JSON.parse(content);
    case 'yml':
    case 'yaml':
      return null;
    default:
      throw new Error(`unknown file extension ${extension}`);
  }
};

export default parse;
