var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const { sendArticle,getArticle } = require('../service/articleService');
const { login } = require('../service/usersService');


const tokenStret = 'aoligei'

/* GET home page. */
/**
 * @api {get} /my-blog/users/logout 获取文章
 * @apiDescription 获取文章
 * @apiName getArticle
 * @apiGroup article
 * @apiSuccess  data 返回文章数组
 * @apiHeader {String} Authorization 用户授权token
 * @apiSampleRequest http://localhost:8088/my-blog/article/sendArticle
 * @apiVersion 1.0.0
 */
router.get('/', async function (req, res, next) {
    const data = await getArticle()
    res.send({data})
});

/**
 * @api {post} /my-blog/users/logout 提交文章
 * @apiDescription 提交文章
 * @apiName sendArticle
 * @apiGroup article
 * @apiParam {string} title 文章标题
 * @apiParam {string} article 文章内容
 * @apiSuccess  message 返回message
 * @apiSuccess  status 返回状态
 * @apiHeader {String} Authorization 用户授权token
 * @apiSampleRequest http://localhost:8088/my-blog/article/sendArticle
 * @apiVersion 1.0.0
 */
router.post('/sendArticle', async function (req, res, next) {
    const article = req.body
    // 获取用户id
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, tokenStret,(err, data) => {
        if(err) {
            result.send(err)
            return
        }else {
            login({
              userName: data.userName
            }).then(resArticle => {
                let userId = resArticle[0]._id.toHexString()
                // 发送service层数据
                sendArticle({userId,article}).then(data => {
                    res.send({
                        message: '提交成功',
                        status: 200
                    })
                })
            })
        }
    })
})

module.exports = router;
