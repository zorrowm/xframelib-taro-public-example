
export default {
  lazyCodeLoading: 'requiredComponents',
  pages: [
    "wxpack/pages/index", //默认首页AppLayout.vue
  ],
  subPackages: [
    {
      "root": "wxpackA",
      "pages": [
        "pages/index",
      ]
    }, 

    /** **************分包Z：通用基础积累 ************** */
    {
      "root": "wxpackZ",
      "pages": [
        "pages/index",
        "pages/error404",
        "pages/login",
        "pages/webViewPage",
        "pages/relicPanoWebPage",
      ]
    }, 
  ],
  window: {
     navigationStyle: 'custom'
  }
};
