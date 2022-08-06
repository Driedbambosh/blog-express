const { usersModel } = require('./models/usersModel')
module.exports.login = async function (user) {
    const data = await usersModel.find(user)
    await usersModel.updateOne({userName: user.userName},{isLogin: true})
    return data
}

module.exports.logout = async function (user) {
    const data = await usersModel.updateOne({userName: user.userName},{isLogin: false})
    return data
}

module.exports.register = async function (user) {
    let data = []
    data = await usersModel.find({userName: user.userName})
    if(data.length == 0){
        user.isLogin = false
        user.avatar = 'http://localhost:8088/images/avatar.jpg'
        data = await usersModel.create(user)
        return data = {
            message: '注册成功!',
            status: 200
        }
    }else {
        return data = {
            message: '用户已注册!',
            status: 500
        }
    }
}

module.exports.userEdit = async function (editData) {
    let data = []
    data = await usersModel.updateOne({userName: editData.userName},editData)
    if (data.acknowledged) {
        data.status = 200
    }else {
        data.status = 500
    }
    return data
}