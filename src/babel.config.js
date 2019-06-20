module.exports = function (api) {
  api.cache(true);

  const plugins = [
    '@babel/transform-react-jsx-source',
  ];

  const presets = [
    'babel-preset-expo',
  ];

  return {
    plugins,
    presets,
  };
};
