const fs = require('fs');
const path = require('path');

module.exports = (() => {
  const files = fs.readdirSync(__dirname);
  const result = [];
  files.forEach((file) => {
    const stats = fs.statSync(path.join(__dirname, file));
    if (stats.isFile() && path.extname(file) === '.js') {
      const name = path.basename(file, '.js');
      if (name === 'load') { return; }
      result[name] = require(__dirname + '/' +name);
    }
  });
  return result;
})();
