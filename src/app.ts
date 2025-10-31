import { createApp } from 'vue'
import initBoot from './boot';
import './app.scss'
const App = createApp({
  onShow(options) {
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})
//初始化启动
initBoot(App);
export default App
