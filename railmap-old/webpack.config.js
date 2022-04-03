const path = require('path');

module.exports = [
    {
    name: 'Main',
    mode: 'production',
    entry: './src/js/index.js',
    output: {
      path: path.resolve(__dirname, 'dist/js'),
      filename: 'index.bundle.js',
    },
  },
  {
    name: 'Virtual Railfan',
    mode: 'production',
    entry: './src/js/vrf.js',
    output: {
      path: path.resolve(__dirname, 'dist/js'),
      filename: 'vrf.bundle.js',
    },
  },
  {
    name: 'Data Only',
    mode: 'production',
    entry: './src/js/data.js',
    output: {
      path: path.resolve(__dirname, 'dist/js'),
      filename: 'data.bundle.js',
    },
  },
];