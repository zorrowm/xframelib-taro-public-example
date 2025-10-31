import functionSettings from "src/settings/functionSetting";

import widgetConfigMap from "src/settings/widgetSetting/index";

import type { IWidgetConfig } from "xframelib-taro";
import { Global } from "xframelib-taro";

let functionList;

/**
 * 获取用户最大角色等级
 * @returns
 */
export function getDefaultMaxRoleLevel(): number {
  return 2;
}
/**
 * 清除权限
 */
export function clearRight() {
  functionList = undefined;
}
/**
 * 判断是否有权限
 * @param funcID 功能标识
 * @returns
 */
export function hasFunction(funcID: string): boolean {
  if (isNoRightVerify()) return true;
  // if (!functionList) functionList = getFunctions(functionSettings, getDefaultMaxRoleLevel());
  if (!functionList || functionList.length === 0) return false;
  return functionList.findIndex((item) => item.id === funcID) >= 0;
}

/**
 * 不对权限验证，只验证用户
 */
export function isNoRightVerify() {
  return Global.Config.UI.IsNoLogin || Global.Config.UI.OnlyUserVerify;
}

/**
 * 白名单数组
 */
const resultWhiteList: Map<string, IWidgetConfig[]> = new Map();
/**
 * 获取不需要登录时，白名单
 * Layouts对应的WidgetConfig数组
 * @returns
 */
function getWhiteListWidgetConfig() {
  const layoutIDwhiteList = ["portalLayout", "bigScreenLayout", "mainLayout"];

  if (resultWhiteList.size == 0) {
    layoutIDwhiteList.forEach((key) => {
      if (widgetConfigMap.has(key)) {
        const tmp = widgetConfigMap.get(key);
        if (tmp) resultWhiteList.set(key, tmp);
      }
    });
  }
  return resultWhiteList;
}

/**
 * 获取授权的Widget组件列表
 * @returns
 */
export function getRightWidgetConfig():
  | Map<string, IWidgetConfig[]>
  | undefined {
  let result: Map<string, IWidgetConfig[]> | undefined = undefined;
  result = widgetConfigMap;
  Global.RightWidgetConfigMap = result;
  return result;
}
