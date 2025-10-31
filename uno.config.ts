import { defineConfig } from "unocss";
import { presetApplet, presetRemRpx } from "unocss-applet";


/**
 * Create UnoCSS config
 */
export function createConfig({ strict = true, dev = true } = {}) {
  return defineConfig({
    presets: [
      presetApplet(),
      presetRemRpx({
        baseFontSize: 4, //默认为16
        screenWidth: 375,
        mode: "rem2rpx",
      }),
    ] as any,
    shortcuts: {}, //分组样式
    rules: [
      //自定义样式
      [
        "inline-icon",
        {
          "vertical-align": "-0.125em",
        },
      ],
      [
        "icon16",
        {
          "font-size": "16px",
          "line-height": "1em",
        },
      ],
      [
        "icon24",
        {
          "font-size": "24px",
          "line-height": "1em",
        },
      ],
      [
        "icon56",
        {
          "font-size": "56px",
          "line-height": "1em",
        },
      ],
    ],
  });
}

export default createConfig();
