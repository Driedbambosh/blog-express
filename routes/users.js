var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { login,register,userEdit,logout } = require('../service/usersService');
const { route } = require('.');

const tokenStret = 'aoligei'

/* GET users listing. */
router.get('/', async function (req, result, next) {
  const user = req.query
  const data = await login(user)

  result.send(data)
});

// login登录
router.post('/login', async function (req, result, next) {
  const {userName, passWord} = req.body
  const data = await login({userName})
  if(userName == '' || passWord == '' || userName == undefined || passWord == undefined) {
    result.send({
      message: "请输入用户名或密码!",
      status: 500
    })
    return
  }
  if(data.length == 0) {
    result.send({
      message: "用户名不存在!",
      status: 500
    })
    return
  }
  // 验证bcrypt加密
  const isLogin = bcrypt.compareSync(passWord, data[0].passWord)
  if(isLogin) {
    // 生成token
    const token = jwt.sign(
      { userName },
      tokenStret,
      { expiresIn: "24h"}
    ) 
    result.send({
      message: "登陆成功!",
      status: 200,
      token
    })
  }else {
    result.send({
      message: "密码错误!",
      status: 500,
    })
  }
});

// register注册
router.post('/register', async function (req, result, next) {
  const {userName, passWord} = req.body
  const newPassWord = bcrypt.hashSync(passWord, 10)
  const data = await register({userName, passWord: newPassWord})

  result.send(data)
});

// logout退出登录
router.post('/logout', async function (req, result, next) {
  const token = req.headers.authorization.split(' ')[1]
  jwt.verify(token, tokenStret,(err, data) => {
      if(err) {
        result.send(err)
        return
      }else {
        logout(data).then(res => {
          if(res.matchedCount == 1) {
            result.send({
              message: '已退出登录',
              status: 200
            })
          }else {
            result.send({
              message: '错误',
              status: 500
            })
          }
        })
        return
      }
  })
});

// userEdit用户编辑
router.post('/userEdit', async function (req, result, next) {
  let editData = req.body
  editData.passWord = bcrypt.hashSync(editData.passWord, 10)
  const data = await userEdit(editData)

  result.send(data)
});

// 获取用户信息
router.get('/getUserInfo', async function (req, result, next) {
  const token = req.headers.authorization.split(' ')[1]
  jwt.verify(token, tokenStret,(err, data) => {
      if(err) {
        result.send(err)
        return
      }else {
        login({
          userName: data.userName
        }).then(res => {
          result.send(res)
        })
      }
  })
})

// route.get('/')

module.exports = router;
