// babel-preset-taro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md
module.exports = {
  presets: [
    ['taro', {
      // 关闭 ES6 转 ES5
      transpile: false,
      framework: 'vue3',
      ts: true,
      compiler: 'webpack5',
    }]
  ]
}
