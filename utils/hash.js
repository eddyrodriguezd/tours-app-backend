const { createHash } = require('crypto');

const hash = (string) => {
  return createHash('sha256').update(string).digest('hex');
}

module.exports = hash;