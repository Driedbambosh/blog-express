const { Schema, model } = require('mongoose')


const usersSchema = new Schema({
    userName: { type: String,unique: true},
    updated: { type: Date, default: Date.now },
    passWord: String,
    avatar: String,
    autograph: String,
    isLogin: Boolean,
    nickName: String,
    introduction: String,
})

// const userEdit = new Schema({

// })
// 定义数据集合的模型，将schema和数据库中的集合关联起来
const usersModel = model('usersModel', usersSchema, 'users')
// 查找 usersModel.find({......数据})不写查找全部
// 新增 userModel.create({.....新增的数据})
// 删除 userModel.deleteOne({.....删除一条数据})
// 删除 userModel.deleteMany({.....删除所有符合条件的数据})
// 修改 userModel.updateOne({....查询的数据},{....修改的数据})


module.exports.usersModel = usersModel