/**
 * 小程序版简化配置
 * 2025-9-24 规范与补充，针对0.0.8匹配
 */
const SysConfig = {
  /*必须，系统配置标题，必须 */
  SiteTitle: "XXX博物馆",
  //用小程序ID作为系统ID
  SystemID: "wxfc6db05a192af997",
  //#region ********后台服务地址配置
  ServiceURL: {
    /**
     * 资源路径
     */
    CDNURL: "https://zorrowm.github.io/weixin/taian",
    /**
     * 在线Icon图标服务
     */
    IconServiceURL: "https://icon.gis.digsur.com/online/",
    /**
     * 用户登录（统一用户登录）（不能带"/"）
     * http://192.168.1.12:83
     */
    LoginAuthURL: "https://auth.gis.digsur.com",
    /**
     * Axios普通WebAPI的BaseURL http://192.168.1.120:5139
     * 全局默认的http请求地址（一般与主hprose相同或不同）;文件上传地址
     */
    DefaultWebAPI: "",
    //全景浏览地址
    ParoURL: "https://zorrowm.github.io/weixin/taian/pano/index.html",
  },
  //#endregion
};

//#region *********其他可扩展执行的JS代码
globalThis.SysConfig = SysConfig;
