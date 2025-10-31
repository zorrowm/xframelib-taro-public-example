import type { IWidgetConfig } from "xframelib-taro";
import { globFilterLayoutWidgetConfig } from "xframelib-taro";

//@ts-ignore
const components = require.context("./modules", false, /\.ts$/);
//导出widgetConfig字典
const widgetCofigMap: Map<
  string,
  Array<IWidgetConfig>
> = globFilterLayoutWidgetConfig(
  components,
  false, //import.meta.env.PROD,
);

export default widgetCofigMap;
