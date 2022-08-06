var express = require('express');
var router = express.Router();
const { sendLabel,deleteLabel,getLabelList,editLabel } = require('../service/labelService');

/* GET label. */
/**
 * @api {post} /my-blog/label/ 新增标签
 * @apiDescription 新增标签
 * @apiName sendLabel
 * @apiGroup label
 * @apiParam {string} labelName 标签名称
 * @apiParam {string} color 标签颜色
 * @apiSuccess  data 返回标签数组
 * @apiHeader {String} Authorization 用户授权token
 * @apiSampleRequest http://localhost:8088/my-blog/label/sendLabel
 * @apiVersion 1.0.0
 */
router.post('/sendLabel', async function (req, res, next) {
    const data = await sendLabel(req.body)
    res.send(data)
});

/* GET home page. */
/**
 * @api {get} /my-blog/getLabelList/ 获取标签列表
 * @apiDescription 获取标签列表
 * @apiName getLabel
 * @apiGroup label
 * @apiSuccess  data 返回标签数组
 * @apiHeader {String} Authorization 用户授权token
 * @apiSampleRequest http://localhost:8088/my-blog/label/
 * @apiVersion 1.0.0
 */
router.get('/', async function (req, res, next) {
    const data = await getLabelList(req.query)
    res.send(data)
});

/**
 * @api {get} /my-blog/article/deleteLabel 删除标签
 * @apiDescription 删除标签
 * @apiName deleteLabel
 * @apiGroup label
 * @apiParam {string} id 标签id
 * @apiSuccess  message 返回message
 * @apiSuccess  status 返回状态
 * @apiHeader {String} Authorization 用户授权token
 * @apiSampleRequest http://localhost:8088/my-blog/label/deleteLabel
 * @apiVersion 1.0.0
 */

 router.get('/deleteLabel', async function (req, res, next) {
    const id = req.query.labelId
    const data = await deleteLabel(id)
    res.send(data)
})

/**
 * @api {post} /my-blog/article/editLabel 编辑
 * @apiDescription 编辑标签
 * @apiName editLabel
 * @apiGroup article
 * @apiParam {string} labelName 文章标题
 * @apiParam {string} color 文章内容
 * @apiSuccess  message 返回message
 * @apiSuccess  status 返回状态
 * @apiHeader {String} Authorization 用户授权token
 * @apiSampleRequest http://localhost:8088/my-blog/label/editLabel
 * @apiVersion 1.0.0
 */
 router.post('/editLabel', async function (req, res, next) {
    const data = req.body
    const data1 = await editLabel(data)
    res.send(data1)
})


module.exports = router;