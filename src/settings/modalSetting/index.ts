import { globFilterObjects } from 'xframelib-taro';
import type {IModalConfig} from 'xframelib-taro';

/**
 * modal窗体配置项
 */
//@ts-ignore
const components = require.context('./modules',false,/\.ts$/);
const modalsConfig: Array<IModalConfig> = globFilterObjects<IModalConfig>(components, false);
export default modalsConfig;
