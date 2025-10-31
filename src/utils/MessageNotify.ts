import Taro from '@tarojs/taro'

export default class MessgeNotify {
  info(msgInfo: string, seconds = 3) {
    const time = seconds <= 0 ? 1000 : seconds * 1000;
    Taro.showToast({
      title: msgInfo,
      icon: 'none',
      duration: time
    });
  }
  success(msgInfo: string, seconds = 3) {
    const time = seconds <= 0 ? 1000 : seconds * 1000;
    Taro.showToast({
      title: msgInfo,
      icon: 'success',
      duration: time
    });
  }
  warning(msgInfo: string, seconds = 3) {
    const time = seconds <= 0 ? 1000 : seconds * 1000;
    Taro.showToast({
      title: msgInfo,
      icon: 'error',
      duration: time
    });
  }
  warn(msgInfo: string, seconds = 3) {
    this.warning(msgInfo, seconds);
  }
  error(msgInfo: string, seconds = 3) {
    const time = seconds <= 0 ? 1000 : seconds * 1000;
    Taro.showToast({
      title: msgInfo,
      icon: 'error',
      duration: time
    });
  }
}

const message = new MessgeNotify();
export { message };
