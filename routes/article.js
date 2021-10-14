var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const { sendArticle,getArticle } = require('../service/articleService');
const { login } = require('../service/usersService');


const tokenStret = 'aoligei'

/* GET home page. */
router.get('/', async function (req, res, next) {
    const data = await getArticle()
    res.send(data)
});

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
