module.exports = {
  presets: [
    '@babel/preset-env',
    // '@babel/preset-typescript',
    {
      modules: false,
      useBuiltIns: 'usage',
      corejs: {
        version: 3,
        proposals: true,
      }
    }
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-modules-commonjs',
  ]
}