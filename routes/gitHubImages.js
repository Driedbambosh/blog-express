var express = require('express');
var request = require('request')
const multer = require('multer');
var querystring = require('querystring')
var http = require('http')
var router = express.Router();
const fs = require("fs");
const util = require("util");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '.jpg') //Appending .jpg
    }
  })
  
  var upload = multer({ storage: storage });

router.post('/',function(req, res, next) {
    res.send({
        message: req.body
    })
})

router.post('/updateImage',upload.single('file'),async function(req, res, next) {
    let file = req.file;
    fs.readFile(file.path,'binary',function(err,data){
        if(err){
            console.log(err)
        }else{
            const buffer = new Buffer(data, 'binary');
            // const buffer = Buffer.from(data);
            // var data = {message: 'ImgUpload',committer:{name: "名字",email: "1145761792@qq.com"},content: buffer.toString('base64')}
            // var dataString = JSON.stringify(data)
            
            var option = {
                url: 'https://api.github.com/repos/Driedbambosh/githubImg/contents/img/'+ file.filename, // 请求的接口
                method: 'PUT',	// 请求方式
                headers: {  
                    'user-agent': 'node.js',
                    'Content-Type': 'text/plain',
                    'Accept': 'application/vnd.github.v3+json',
                    'Authorization': 'token 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'
                },
                json: true,
                body: {
                    'message': 'ImgUpload',
                    'committer':{
                        'name': "名字",
                        'email': "1145761792@qq.com"
                    },
                    'content': buffer.toString('base64')
                },
            }
            fs.unlink('uploads/'+file.filename,err => {
                if(!err) console.log('删除成功');else {console.log('删除失败');}
            })
            console.log('上传图片.....');
            request(option, function(error, response, body){
                if(response.statusCode == 201) {
                    res.send({
                        message: '上传成功',
                        url: response.body.content.download_url,
                        status: 200,
                    })
                }else {
                    res.send({
                        message: '上传失败',
                        status: response.statusCode,
                    })
                }
                
            })

        }
    });
})

module.exports = router;
