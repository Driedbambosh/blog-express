
const expressJWT = require('express-jwt')

const jwtAuth = expressJWT({
    secret: 'aoligei', // 生成token时配置的秘钥字符串
    algorithms: ['HS256'], // 设置jwt算法
    credentialsRequired: true, // 对于没有token的请求不进行解析
}).unless({
    // 设置不需要验证token的路径
    path: ['/my-blog/users/login', '/my-blog/users/register']
})

module.exports = jwtAuth