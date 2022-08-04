var express = require('express');
var router = express.Router();
var fs = require('fs');
const multer = require('multer');
// 引入七牛模块  
var qiniu = require("qiniu");
//要上传的空间名
var bucket = 'driedbambosh'; 
var imageUrl = 'rg2vn9rfj.hd-bkt.clouddn.com'; // 域名名称
var accessKey = 'J7_vV1nZcM1W-IuRAEvljIp_9U38fHsUn_BFiGq7';
var secretKey = 'nYOKgluha9m0CzwY4P5zQvMcDvmMog2UOTy9YXkx';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg') //Appending .jpg
  }
})

var upload = multer({ storage: storage });

var options = {
  scope: bucket,
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken = putPolicy.uploadToken(mac);

var config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z0;
// 图片上传
router.post('/upload',upload.single('file'),async function(req, res, next){
    // 图片数据流
    var imgData = req.file;
    // 构建图片名
    var fileName = Date.now() + '.png';
    // 构建图片路径
    var filePath = 'uploads/'+fileName;
    var dataBuffer = ''
    //过滤data:URL
    fs.readFile(imgData.path,'binary',function(err,data){
        if(err){
            console.log(err)
        }else {
            dataBuffer = new Buffer(data, 'binary');
            // var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
            fs.writeFile(filePath, dataBuffer, function(err) {
                if(err){
                res.send({status:'102',msg:'文件写入失败'}); 
                }else{

                    var localFile = filePath;
                    var formUploader = new qiniu.form_up.FormUploader(config);
                    var putExtra = new qiniu.form_up.PutExtra();
                    var key = fileName;
                    // 文件上传
                    formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
                    respBody, respInfo) {
                    if (respErr) {
                        res.send({status:'-1',msg:'上传失败',error:respErr});   
                    }
                    if (respInfo.statusCode == 200) {
                        var imageSrc = 'http://rg2vn9rfj.hd-bkt.clouddn.com/' + respBody.key;
                        res.send({status:'200',msg:'上传成功',imageUrl:imageSrc});
                    } else {
                        res.send({status:'-1',msg:'上传失败',error:JSON.stringify(respBody)});  
                    }
                    // 上传之后删除本地文件
                    fs.unlink(filePath,err => {
                        if(!err) console.log('删除成功');else {console.log('删除失败');}
                    })
                    fs.unlink('uploads/'+req.file.filename,err => {
                        if(!err) console.log('删除成功');else {console.log('删除失败');}
                    })
                    });
                }
            });
        }

    })
    
})

module.exports = router;
