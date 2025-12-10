/**
 * 动态加载 API 模块
 * @author 北京智匠坊科技有限公司
 */
const files = import.meta.glob('./*.js', { eager: true }); // 使用 import.meta.glob 导入当前目录下的所有 JS 文件

// 初始化一个空对象，用于存储所有导入的 API 模块
let api = {};

// 遍历所有导入的文件，处理其键名和键值
Object.keys(files).forEach((key) => {
  // 使用正则表达式从文件路径中提取文件名（去掉路径和后缀）
  const apiName = key.replace(/(.*\/)*([^.]+).*/gi, '$2');

  // 将文件中的默认导出对象赋值到 api 对象中，使用提取出的 api 名作为键
  api[apiName] = files[key].default;
});

export default api; // 导出最终的 api 对象
