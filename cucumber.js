let common = [
  'features/**/*.feature', // Specify our feature files
  '--require-module ts-node/register', // Load TypeScript module
  '--require features/**/*.ts', // Load step definitions
  '--format progress-bar', // Load custom formatter
].join(' ');

process.env.JWT_SECRET = 'secret';
process.env.DB_FILE = 'cucumber.sqlite';

module.exports = {
  default: common,
};
