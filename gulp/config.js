const _ = require('lodash');
const config = Object.create(require('../config'));
const TYPE = getType(process.argv);
const TYPE_REG = /%type%/g;

function getType(args) {
  const result = _.findLast(args, (val) => { return /^-(?!-)+/.test(val); });
  if (result) { return result.replace(/^-/, ''); }
  return config.defaultPath;
}

function buildPath(data) {
  if (typeof data === 'number') { return data; }
  if (typeof data === 'string') { return data.replace(TYPE_REG, TYPE); }
  for (var key in data) {
    var value = data[key];
    delete data[key];
    data[buildPath(key)] = buildPath(value);
  }
  return data;
}

buildPath(config);
config.TYPE = TYPE;
module.exports = config;
