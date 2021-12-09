var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const { sendArticle,getArticle,getArticleId,getArticleDetail,deleteArticle,editArticle } = require('../service/articleService');
const { login } = require('../service/usersService');


const tokenStret = 'aoligei'

/* GET home page. */
/**
 * @api {get} /my-blog/article/ 获取文章列表
 * @apiDescription 获取文章
 * @apiName getArticle
 * @apiGroup article
 * @apiSuccess  data 返回文章数组
 * @apiHeader {String} Authorization 用户授权token
 * @apiSampleRequest http://localhost:8088/my-blog/article/sendArticle
 * @apiVersion 1.0.0
 */
router.get('/', async function (req, res, next) {
    const data = await getArticle(req.query)
    res.send(data)
});

/* GET home page. */
/**
 * @api {get} /my-blog/article/ 获取用户文章列表
 * @apiDescription 获取文章
 * @apiName getArticle
 * @apiGroup article
 * @apiSuccess  data 返回文章数组
 * @apiHeader {String} Authorization 用户授权token
 * @apiSampleRequest http://localhost:8088/my-blog/article/sendArticle
 * @apiVersion 1.0.0
 */
 router.get('/forId', async function (req, res, next) {
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, tokenStret,(err, data) => {
        getArticleId({page:req.query,user:data.id}).then(article => {
            const data1 = article 
            res.send(data1)
         })
    })
    
});


/* GET 文章详情. */
/**
 * @api {get} /my-blog/article/getArticle 获取文章详情
 * @apiDescription 获取文章详情
 * @apiName getArticle
 * @apiGroup article
 * @apiParam {string} articleId 文章id
 * @apiSuccess  data 返回文章详情
 * @apiHeader {String} Authorization 用户授权token
 * @apiSampleRequest http://localhost:8088/my-blog/article/sendArticle
 * @apiVersion 1.0.0
 */
router.get('/getArticle', async function (req, res, next) {
    const articleId = req.query.articleId
    const data = await getArticleDetail(articleId)
    res.send(data)
});

/**
 * @api {post} /my-blog/article/sendArticle 提交文章
 * @apiDescription 提交文章
 * @apiName sendArticle
 * @apiGroup article
 * @apiParam {string} title 文章标题
 * @apiParam {string} article 文章内容
 * @apiParam {string} introduction 简介
 * @apiParam {string} picture 文章图片
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

/**
 * @api {get} /my-blog/article/deleteArticle 删除文章
 * @apiDescription 删除文章
 * @apiName deleteArticle
 * @apiGroup article
 * @apiParam {string} id 文章id
 * @apiSuccess  message 返回message
 * @apiSuccess  status 返回状态
 * @apiHeader {String} Authorization 用户授权token
 * @apiSampleRequest http://localhost:8088/my-blog/article/deleteArticle
 * @apiVersion 1.0.0
 */

router.get('/deleteArticle', async function (req, res, next) {
    const id = req.query.articleId
    const data = await deleteArticle(id)
    res.send(data)    
})

/**
 * @api {post} /my-blog/article/editArticle 编辑
 * @apiDescription 编辑文章
 * @apiName editArticle
 * @apiGroup article
 * @apiParam {string} title 文章标题
 * @apiParam {string} article 文章内容
 * @apiParam {string} introduction 简介
 * @apiParam {string} picture 文章图片
 * @apiSuccess  message 返回message
 * @apiSuccess  status 返回状态
 * @apiHeader {String} Authorization 用户授权token
 * @apiSampleRequest http://localhost:8088/my-blog/article/deleteArticle
 * @apiVersion 1.0.0
 */
router.post('/editArticle', async function (req, res, next) {
    const data = req.body
    const data1 = await editArticle({
        id: data._id,
        title: data.title,
        article: data.article,
        introduction: data.introduction,
        picture: data.picture,
    })
    res.send(data1)    
})

module.exports = router;
