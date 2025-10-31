import { defineStore } from 'pinia';
import type { ISystemUser } from 'xframelib-taro';
import { Storage } from 'xframelib-taro';

const USER_SYS_KEY = 'USER_SYS_KEY';
const userST = new Storage('');

//定义Store函数
export const userStore = defineStore('user', {
  state: () => {
    const cacheValue = userST.get(USER_SYS_KEY);
    const stateData: ISystemUser = (cacheValue || {}) as ISystemUser;
    return stateData;
  },
  getters: {

    // /**
    //  * 默认最大角色等级
    //  * @param state
    //  * @returns
    //  */
    // DefaultMaxRoleLevel(state) {
    //   const role = state.roles?.[0];
    //   let level = -1;
    //   if (role) {
    //     level = role.level;
    //   }
    //   return level;
    // },
  },
  actions: {
    /**
     * 手机号绑定ID身份
     * @param phoneNum 手机号
     */
    setBindID(phoneNum:string)
    {
        this.bindid=phoneNum;
        //TODO: 通过手机号换取身份信息
        //保存到缓存里
        this.saveCacheStore()
        
    },
    /**
     * 初始化
     * @param data 登录数据
     */
    init(data: ISystemUser) {
      this.id = data.id;
      this.name = data.name;
      this.doubletoken = data.doubletoken;
      this.roles = data.roles;
      this.bindid = data.bindid;
      //保存
      userST.set(USER_SYS_KEY, {
        id: data.id,
        name: data.name,
        roles: data.roles,
        doubletoken: data.doubletoken,
        bindid: data.bindid,
      });
    },

    //退出登录
    clear() {
      this.id = undefined;
      this.name = undefined;
      this.doubletoken = undefined;
      this.roles = undefined;
      this.bindid = undefined;
      //清除
      userST.remove(USER_SYS_KEY);
    },
    //保存
    saveCacheStore() {
        userST.set(USER_SYS_KEY, this.$state);
      },
  },
});
