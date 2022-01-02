const path = require('path');

module.exports = [
    {
    name: 'Main',
    mode: 'production',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.bundle.js',
    },
  },
  {
    name: 'Virtual Railfan',
    mode: 'production',
    entry: './src/vrf.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'vrf.bundle.js',
    },
  },
  {
    name: 'Data Only',
    mode: 'production',
    entry: './src/data.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'data.bundle.js',
    },
  },
];