import { requestGet, requestPost, requestPostBody } from "xframelib-taro";
const baseURL: string = "https://taianbwg.gis.digsur.com";
const authorization =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwibmFtZSI6ImFkbWluIiwicm9sZSI6IkFkbWluaXN0cmF0b3IiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2lzcGVyc2lzdGVudCI6IkZhbHNlIiwibmJmIjoxNzYxMjc1MzQ4LCJleHAiOjE3NjEzNjE3NDgsImlhdCI6MTc2MTI3NTM0OH0.R9_fGe8lJRCsQkc-9plc67N2EoaUlawqG2Ut-81bo8o";
/**
 * 获取内容列表
 * @param bodyParams
 */
export async function GetContentsv1(bodyParams) {
  const authorization = "";
  const response = await requestPostBody(
    APIKey.GetContentsv1,
    baseURL,
    bodyParams,
    undefined,
    { authorization },
  );
  return response?.data;
}

/**
 * 获取内容列表
 * @param bodyParams
 */
export async function GetContentsList(bodyParams) {
  // const authorization = "Bearer " + localStorage.getItem("USERACCESS_TOKEN");
  const response = await requestPostBody(
    APIKey.GetContentsList,
    baseURL,
    bodyParams,
    undefined,
    { authorization },
  );
  return response?.data;
}

/**
 * 获取内容
 * @param siteId
 * @param channelId
 * @param contentId
 */
export async function GetContents(siteId, channelId, contentId) {
  // const authorization = "Bearer " + localStorage.getItem("USERACCESS_TOKEN");
  const response = await requestGet(
    APIKey.GetContents,
    baseURL,
    { siteId, channelId, contentId },
    { authorization },
  );
  return response?.data;
}

/**
 * 新增内容
 * @param bodyParams
 */
export async function AddContents(bodyParams) {
  // const authorization = "Bearer " + localStorage.getItem("USERACCESS_TOKEN");
  const response = await requestPostBody(
    APIKey.AddContents,
    baseURL,
    bodyParams,
    undefined,
    { authorization },
  );
  return response?.data as any;
}

/**
 * 修改内容
 * @param bodyParams
 */
export async function UpdateContents(bodyParams) {
  // const authorization = "Bearer " + localStorage.getItem("USERACCESS_TOKEN");
  const response = await requestPostBody(
    APIKey.UpdateContents,
    baseURL,
    bodyParams,
    undefined,
    { authorization },
  );
  return response?.data as any;
}

/**
 * 预览
 * @param bodyParams
 */
export async function PreviewContents(bodyParams) {
  // const authorization = "Bearer " + localStorage.getItem("USERACCESS_TOKEN");
  const response = await requestPostBody(
    APIKey.PreviewContents,
    baseURL,
    bodyParams,
    undefined,
    { authorization },
  );
  return response?.data as any;
}

/**
 * 获取内容json文件
 * @param bodyParams
 */
export async function SaveIds(bodyParams) {
  // const authorization = "Bearer " + localStorage.getItem("USERACCESS_TOKEN");
  const response = await requestPostBody(
    APIKey.SaveIds,
    baseURL,
    bodyParams,
    undefined,
    { authorization },
  );
  return response?.data as any;
}

/**
 * 删除内容
 * @param bodyParams
 */
export async function DeleteContents(bodyParams) {
  // const authorization = "Bearer " + localStorage.getItem("USERACCESS_TOKEN");
  const response = await requestPostBody(
    APIKey.DeleteContents,
    baseURL,
    bodyParams,
    undefined,
    { authorization },
  );
  return response?.data as any;
}

/**
 * 上传图片
 * @param siteId
 * @param userId
 * @param file
 */
export async function UploadImage(siteId, userId, file): Promise<string> {
  // const authorization = "Bearer " + localStorage.getItem("USERACCESS_TOKEN");
  const response = await requestPost(
    APIKey.UploadImage,
    baseURL,
    { file },
    { siteId, userId },
    { authorization },
  );
  return response?.data as string;
}

/**
 * 关联图片
 * @param bodyParams
 */
export async function layerImageUpload(bodyParams) {
  // const authorization = "Bearer " + localStorage.getItem("USERACCESS_TOKEN");
  const response = await requestPostBody(
    APIKey.layerImageUpload,
    baseURL,
    bodyParams,
    undefined,
    { authorization },
  );
  return response?.data as any;
}

/**
 * 上传文件
 * @param siteId
 * @param userId
 * @param file
 */
export async function UploadFile(
  siteId: string,
  userId: number,
  file: string,
): Promise<string> {
  // const authorization = "Bearer " + localStorage.getItem("USERACCESS_TOKEN");
  const response = await requestPost(
    APIKey.UploadFile,
    baseURL,
    { file },
    { siteId, userId, authorization },
  );
  return response?.data as string;
}

/**
 * 关联附件
 * @param bodyParams
 */
export async function layerFileUpload(bodyParams) {
  // const authorization = "Bearer " + localStorage.getItem("USERACCESS_TOKEN");
  const response = await requestPostBody(
    APIKey.layerFileUpload,
    baseURL,
    bodyParams,
    undefined,
    { authorization },
  );
  return response?.data as any;
}

/**
 * 获取验证码
 */
export async function GetCaptcha() {
  // const authorization = "Bearer " + localStorage.getItem("USERACCESS_TOKEN");
  const response = await requestPostBody(
    APIKey.GetCaptcha,
    baseURL,
    undefined,
    undefined,
    { authorization },
  );
  return response?.data as any;
}

/**
 * 管理员登录
 * @param bodyParams
 */
export async function AdminLogin(bodyParams) {
  // const authorization = "Bearer " + localStorage.getItem("USERACCESS_TOKEN");
  const response = await requestPostBody(
    APIKey.AdminLogin,
    baseURL,
    bodyParams,
    undefined,
    { authorization },
  );
  return response?.data as any;
}

/**
 * 活动设置（添加馆内活动的新闻后，还必须要设置这个）
 * @param bodyParams
 */
export async function activityRegist(bodyParams) {
  // const authorization = "Bearer " + localStorage.getItem("USERACCESS_TOKEN");
  const response = await requestPostBody(
    APIKey.activityRegist,
    baseURL,
    bodyParams,
    undefined,
    { authorization },
  );
  return response?.data as any;
}

/**
 * 更新活动设置信息
 * @param bodyParams
 */
export async function activityUpdate(bodyParams) {
  // const authorization = "Bearer " + localStorage.getItem("USERACCESS_TOKEN");
  const response = await requestPostBody(
    APIKey.activityUpdate,
    baseURL,
    bodyParams,
    undefined,
    { authorization },
  );
  return response?.data as any;
}

/**
 * 获取活动列表（已设置的），后台会自动刷新活动状态
 * @param channelId
 * @param status
 * @param page
 * @param pageSize
 * @param siteId
 */
export async function getActivityList(
  channelId,
  status,
  page,
  pageSize,
  siteId,
) {
  // const authorization = "Bearer " + localStorage.getItem("USERACCESS_TOKEN");
  const response = await requestGet(
    APIKey.getActivityList,
    baseURL,
    { channelId, status, page, pageSize, siteId },
    { authorization },
  );
  return response?.data;
}

/**
 * 获取单个活动的设置信息
 * @param siteId
 * @param channelId
 * @param contentId
 */
export async function getActivityInfo(siteId, channelId, contentId) {
  // const authorization = "Bearer " + localStorage.getItem("USERACCESS_TOKEN");
  const response = await requestGet(
    APIKey.getActivityInfo,
    baseURL,
    { siteId, channelId, contentId },
    { authorization },
  );
  return response?.data;
}

/**
 * 删除活动设置，注意！会同时删除活动新闻！
 * @param siteId
 * @param channelId
 * @param contentId
 */
export async function deleteActivity(
  siteId,
  channelId,
  contentId,
): Promise<string> {
  // const authorization = "Bearer " + localStorage.getItem("USERACCESS_TOKEN");
  const response = await requestPost(
    APIKey.deleteActivity,
    baseURL,
    undefined,
    { siteId, channelId, contentId },
    { authorization },
  );
  return response?.data as string;
}

/**
 * 活动报名
 * @param bodyParams
 */
export async function activitySubmit(bodyParams) {
  // const authorization = "Bearer " + localStorage.getItem("USERACCESS_TOKEN");
  const response = await requestPostBody(
    APIKey.activitySubmit,
    baseURL,
    bodyParams,
    undefined,
    { authorization },
  );
  return response?.data as any;
}

/**
 * 藏品列表
 * @param type
 * @param orderstr
 * @param keyword
 * @param page
 * @param pageSize
 */
export async function get3DCangpinList(
  type,
  orderstr,
  keyword,
  page,
  pageSize,
) {
  // const authorization = "Bearer " + localStorage.getItem("USERACCESS_TOKEN");
  const response = await requestGet(
    APIKey.get3DCangpinList,
    baseURL,
    { type, orderstr, keyword, page, pageSize },
    { authorization },
  );
  return response?.data;
}

/**
 * 单个藏品查询，根据guid
 * @param guid
 */
export async function get3DCangpinInfo(guid) {
  // const authorization = "Bearer " + localStorage.getItem("USERACCESS_TOKEN");
  const response = await requestGet(
    APIKey.get3DCangpinInfo,
    baseURL,
    { guid },
    { authorization },
  );
  return response?.data;
}

const APIKey = {
  GetContentsv1: "/api/v1/contents",
  GetContentsList: "/api/admin/cms/contents/contents/actions/list",
  GetContents: "/api/admin/cms/editor",
  AddContents: "/api/admin/cms/editor/actions/insert",
  UpdateContents: "/api/admin/cms/editor/actions/update",
  PreviewContents: "/api/admin/cms/editor/actions/preview",
  SaveIds: "/api/admin/cms/contents/contents/actions/saveIds",
  DeleteContents: "/api/admin/cms/contents/contentsLayerDelete",
  UploadImage: "/api/admin/common/form/layerImageUpload/actions/upload",
  layerImageUpload: "api/admin/common/form/layerImageUpload",
  UploadFile: "/api/admin/common/form/layerFileUpload/actions/upload",
  layerFileUpload: "/api/admin/common/form/layerFileUpload",
  GetCaptcha: "/api/admin/login/captcha",
  AdminLogin: "/api/admin/login",
  activityRegist: "/api/admin/huodong/setting/actions/add",
  activityUpdate: "/api/admin/huodong/setting/actions/update",
  getActivityList: "/api/admin/huodong/setting/list",
  getActivityInfo: "/api/admin/huodong/setting",
  deleteActivity: "/api/admin/huodong/setting/actions/delete",
  activitySubmit: "/api/huodong/yuyue/Submit",
  get3DCangpinList: "/api/cangpin/CangPin/list",
  get3DCangpinInfo: "/api/cangpin/CangPin",
};
