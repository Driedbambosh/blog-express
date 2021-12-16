// mongoDb
const mongoose = require('mongoose');
// 数据库地址
// const dbURL = 'mongodb://192.168.0.117:27017/expressTest'
const dbURL = 'mongodb://192.168.0.117:27017/expressTest'
mongoose.connect(dbURL);
// 数据库连接成功
mongoose.connection.on('connected', () => {
  console.log(dbURL + '数据库连接成功')
})