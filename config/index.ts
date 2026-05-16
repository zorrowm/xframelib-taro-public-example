import { defineConfig, type UserConfigExport } from "@tarojs/cli";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import devConfig from "./dev";
import prodConfig from "./prod";
import NutUIResolver from "@nutui/auto-import-resolver";
import Components from "unplugin-vue-components/webpack";
import path from "path";
import AutoImport from "unplugin-auto-import/webpack";
// import UnoCSS from "@unocss/webpack";
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig<"webpack5">(async (merge, { command, mode }) => {
  const baseConfig: UserConfigExport<"webpack5"> = {
    projectName: "taro-vue3-template",
    date: "2025-9-4",
    designWidth(input) {
      // 配置 NutUI 375 尺寸
      if (input?.file?.replace(/\\+/g, "/").indexOf("@nutui") > -1) {
        return 375;
      }
      // 全局使用 Taro 默认的 750 尺寸
      return 750;
    },
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2,
    },
    sourceRoot: "src",
    outputRoot: "dist",
    plugins: [
      "@tarojs/plugin-html",
      // "@tarojs/plugin-http",
    ],
    //定义常量https://docs.taro.zone/docs/config-detail#defineconstants
    defineConstants: {
      // __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ 控制 Vue 在生产环境中是否提供 hydration（水合）不匹配的详细错误信息：
      // 设置为 false（推荐生产环境）：不显示详细信息，减少生产包体积
      // 设置为 true：在生产环境中也显示详细的水合不匹配信息（会增加包体积）
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false)
    },
    copy: {
      patterns: [
        //拷贝图片资源
        // { from: 'src/assets/img', to: 'dist/assets/img' }
      ],
      options: {},
    },
    framework: "vue3",
    alias: {
      "@": path.resolve(__dirname, "..", "src"),
    },
    compiler: {
      type: "webpack5",
      prebundle: {
        enable: false,
        exclude: ['@nutui/nutui-taro'],
      },
    },
    cache: {
      enable: false, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
    },
    // jsMinimizer: 'esbuild',
    // esbuild: {
    //   minify: {
    //     config: {
    //       target: ['es2015', 'chrome58', 'firefox75', 'safari11'],
    //       charset: 'utf8',
    //     },
    //   },
    // },
    sass: {
      data: `@use "@/assets/style/core.scss" as *;`,
    },
    mini: {
      optimizeMainPackage: {
        enable: true,
        // exclude: [] // 可选，配置不提取的模块
      },
      miniCssExtractPluginOption: {
        ignoreOrder: true,
      },
      postcss: {
        pxtransform: {
          enable: true,
          config: {},
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: "module", // 转换模式，取值为 global/module
            generateScopedName: "[name]__[local]___[hash:base64:5]",
          },
        },
      },
      sassLoaderOption: {
        sassOptions: {
          silenceDeprecations: ['import'],
        },
      },
      //参考：https://docs.taro.zone/docs/config-detail#miniwebpackchain
      webpackChain(chain) {
        // 调整 Webpack 性能检查规则
        chain.performance.maxAssetSize(512000); // 最大单个资源大小（单位：字节，512000 = 500KiB）; // 最大入口资源大小
        // .hints(false); // 可选：直接关闭性能警告（不推荐，可能忽略真正的体积问题）

        // 禁用 sourceMap 生成
        chain.devtool(false);
        chain.resolve.plugin("tsconfig-paths").use(TsconfigPathsPlugin);
        chain.module
          .rule("svg")
          .test(/\.svg$/)
          .use("svg-url-loader")
          .loader("svg-url-loader") // 需先安装 npm install svg-url-loader -D
          .options({ encoding: "base64" });

        chain.plugin("unplugin-vue-components").use(
          Components({
            dirs: ["src/components"],
            resolvers: [
              NutUIResolver({
                taro: true,
              }),
            ],
            dts: "types/components.d.ts",
            extensions: ["vue"],
          })
        );
        chain.plugin("unplugin-auto-import").use(
          AutoImport({
            imports: [
              "vue-router",
              {
                "@tarojs/taro": ["showToast"],
              },
            ],
            dts: "types/auto-imports.d.ts",
            dirs: ["src/composables/**", "src/utils"],
          })
        );
        // chain.resolve.alias.set('browser-lib', 'false');
        // chain.plugin("unocss").use(UnoCSS());
        // 排除 NutUI 图标字体文件
        chain.module
          .rule("fonts")
          .exclude.add(/nutui-iconfont\.(eot|woff|woff2|ttf|svg)$/);

        if (process.env.NODE_ENV === "production") {
          chain.plugin("analyzer").use(BundleAnalyzerPlugin, [
            {
              analyzerMode: "static", // 生成静态 HTML 报告
              reportFilename: "bundle-analyzer-report.html", // 报告路径
              openAnalyzer: true, // 打包后自动打开报告
            },
          ]);
        }
        chain.merge({
          optimization: {
            splitChunks: {
              cacheGroups: {
                // vueRouter 相关
                vuerouter: {
                  test: /[\\/]node_modules[\\/]vue-router[\\/]/, // 精准匹配 axios
                  name: "vendor-vuerouter", // 拆分后 chunk 名称
                  priority: 100,
                },
                // xframelib-taro 相关
                xframelib: {
                  test: /[\\/]node_modules[\\/]xframelib-taro[\\/]/,
                  name: "vendor-xframelib",
                  priority: 110,
                },
              },
            },
          },
        });
      },
      commonChunks: [
        "runtime",
        "vendors",
        "taro",
        "common",
        "vendor-xframelib",
        "vendor-vuerouter",
      ],
    },
    h5: {
      publicPath: "/",
      staticDirectory: "static",
      output: {
        filename: "js/[name].[hash:8].js",
        chunkFilename: "js/[name].[chunkhash:8].js",
      },
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: "css/[name].[hash].css",
        chunkFilename: "css/[name].[chunkhash].css",
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {},
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: "module", // 转换模式，取值为 global/module
            generateScopedName: "[name]__[local]___[hash:base64:5]",
          },
        },
      },
      webpackChain(chain) {
        chain.resolve.plugin("tsconfig-paths").use(TsconfigPathsPlugin);
        chain.plugin("unplugin-vue-components").use(
          Components({
            resolvers: [NutUIResolver({ taro: true })],
          })
        );
        chain.plugin("unocss").use(UnoCSS());
      },
    },
    rn: {
      appName: "taroDemo",
      postcss: {
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        },
      },
    },
  };
  if (process.env.NODE_ENV === "development") {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig);
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig);
});
