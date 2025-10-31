import type { IWidgetMenu } from 'xframelib-taro';
import { globFilterObjects } from 'xframelib-taro';

//@ts-ignore
const components = require.context('./modules',false,/\.ts$/);
const menuCofig: Array<IWidgetMenu> = globFilterObjects<IWidgetMenu>(components, true);
export default menuCofig;
