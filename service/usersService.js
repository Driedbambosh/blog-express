const { login,register,userEdit,logout } = require('../dao/usersDao')
module.exports.login = async function (user) {
    const data = await login(user)
    return data
}

module.exports.userEdit = async function (editData) {
    const data = await userEdit(editData)
    return data
}

module.exports.register = async function (user) {
    const data = await register(user)
    return data
}

module.exports.getUserInfo = async function (user) {
    const data = await login(user)
    return data
}

module.exports.logout = async function (user) {
    const data = await logout(user)
    return data
}

