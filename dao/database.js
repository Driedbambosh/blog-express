/*
 * @Author: your name
 * @Date: 2021-12-14 21:44:05
 * @LastEditTime: 2022-04-03 18:13:08
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-express\dao\database.js
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