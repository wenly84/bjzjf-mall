// file.js
import { baseUrl, apiPath, tenantId } from '@/sheep/config';

/**
 * FileApi - 文件相关的API接口封装
 * @author 北京智匠坊科技有限公司
 */
const FileApi = {
  /**
   * 上传文件
   * 通过 uni.uploadFile 上传文件到服务器，支持上传进度和错误处理
   *
   * @param {String} file - 文件路径
   * @returns {Promise} 返回上传结果的 Promise
   */
  uploadFile: (file) => {
    // 获取存储的令牌，后续可能需要进行验证
    const token = uni.getStorageSync('token');

    // 显示加载提示
    uni.showLoading({
      title: '上传中...',
    });

    // 返回 Promise 进行异步处理
    return new Promise((resolve, reject) => {
      uni.uploadFile({
        url: baseUrl + apiPath + '/infra/file/upload', // 拼接完整的文件上传地址
        filePath: file, // 上传文件的路径
        name: 'file', // 文件字段名
        header: {
          Accept: '*/*', // 服务器接受的文件类型
          'tenant-id': tenantId, // 租户ID，标识所属租户
          // Authorization: 'Bearer ' + token, // 访问令牌（暂未接入）
        },
        success: (uploadFileRes) => {
          let result = JSON.parse(uploadFileRes.data); // 解析返回的 JSON 数据
          if (result.error === 1) {
            // 错误提示
            uni.showToast({
              icon: 'none',
              title: result.msg,
            });
            return resolve(false); // 上传失败时返回 false
          } else {
            // 上传成功时返回结果
            return resolve(result);
          }
        },
        fail: (error) => {
          // 上传失败时打印错误信息
          console.log('上传失败：', error);
          return resolve(false); // 出现失败时返回 false
        },
        complete: () => {
          // 完成上传，无论成功失败都需要隐藏加载提示
          uni.hideLoading();
        },
      });
    });
  },
};

export default FileApi;
