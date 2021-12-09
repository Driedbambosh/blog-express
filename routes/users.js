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

/**
 * @api {post} /my-blog/users/login 用户登录
 * @apiDescription 用户登录
 * @apiName login
 * @apiGroup User
 * @apiParam {string} userName 用户名
 * @apiParam {string} passWord 密码
 * @apiSuccess  message 返回message
 * @apiSuccess  status 返回状态
 * @apiSampleRequest http://localhost:8088/my-blog/users/login
 * @apiVersion 1.0.0
 */
router.post('/login', async function (req, result, next) {
  const {userName, passWord} = req.body
  console.log(req.body);
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
      { userName,id:data[0]._id },
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
/**
 * @api {post} /my-blog/users/register 用户注册
 * @apiDescription 用户注册
 * @apiName register
 * @apiGroup User
 * @apiParam {string} userName 用户名
 * @apiParam {string} passWord 密码
 * @apiSuccess  message 返回message
 * @apiSuccess  status 返回状态
 * @apiSampleRequest http://localhost:8088/my-blog/users/register
 * @apiVersion 1.0.0
 */
router.post('/register', async function (req, result, next) {
  const {userName, passWord} = req.body
  const newPassWord = bcrypt.hashSync(passWord, 10)
  // 默认昵称
  const data = await register({userName, passWord: newPassWord,nickName: 'admin'})

  result.send(data)
});

// logout退出登录
/**
 * @api {post} /my-blog/users/logout 退出登录
 * @apiDescription 退出登录
 * @apiName logout
 * @apiGroup User
 * @apiSuccess  message 返回message
 * @apiSuccess  status 返回状态
 * @apiHeader {String} Authorization 用户授权token
 * @apiSampleRequest http://localhost:8088/my-blog/users/logout
 * @apiVersion 1.0.0
 */
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
/**
 * @api {post} /my-blog/users/userEdit 用户编辑
 * @apiDescription 用户编辑
 * @apiName userEdit
 * @apiGroup User
 * @apiParam {string} nickName 昵称
 * @apiParam {string} avatar 头像
 * @apiParam {string} introduction 简介
 * @apiSuccess  message 返回message
 * @apiSuccess  status 返回状态
 * @apiHeader {String} Authorization 用户授权token
 * @apiSampleRequest http://localhost:8088/my-blog/users/userEdit
 * @apiVersion 1.0.0
 */
router.post('/userEdit', async function (req, result, next) {
  let editData = req.body
  // 加密密码
  // editData.passWord = bcrypt.hashSync(editData.passWord, 10)
  const data = await userEdit(editData)

  result.send(data)
});

// 获取用户信息
/**
 * @api {get} /my-blog/users/getUserInfo 获取用户信息
 * @apiDescription 获取用户信息
 * @apiName getUserInfo
 * @apiGroup User
 * @apiSuccess  avatar 头像
 * @apiSuccess  isLogin 登录状态
 * @apiSuccess  passWord 加密密码
 * @apiSuccess  userName 用户名
 * @apiSuccess  _id 用户id
 * @apiHeader {String} Authorization 用户授权token
 * @apiSampleRequest http://localhost:8088/my-blog/users/logout
 * @apiVersion 1.0.0
 */
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
          result.send({...res,status:200})
        })
      }
  })
})

// route.get('/')

module.exports = router;
