import { Global } from "xframelib-taro";

/**
 * 获取图片的正确完整路径
 * @param url
 * @returns
 */
export function getRightURL(url: string) {
  if (url) return Global.getResourceURL(url);
  else {
    console.log("url空对象");
    return url;
  }
}
