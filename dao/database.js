/*
 * @Author: Driedbambosh 1145761792@qq.com
 * @Date: 2022-08-06 19:18:01
 * @LastEditors: Driedbambosh 1145761792@qq.com
 * @LastEditTime: 2022-08-06 19:22:03
 * @FilePath: \blog-express\dao\database.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// mongoDb
const mongoose = require('mongoose');
// 数据库地址
// const dbURL = 'mongodb://192.168.0.117:27017/expressTest'
const dbURL = 'mongodb://localhost:27017/expressTest'
mongoose.connect(dbURL);
// 数据库连接成功
mongoose.connection.on('connected', () => {
  console.log(dbURL + '数据库连接成功')
})