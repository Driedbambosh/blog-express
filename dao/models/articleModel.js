const { Schema, model } = require('mongoose')


const articleSchema = new Schema({
    title: String,
    article: String,
    picture: String,
    introduction: String,
    label: Array,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'usersModel'
    }
},{ timestamps:true })


const articleBriefSchema = new Schema({
    title: String,
    picture: String,
    introduction: String,
    label: Array,
    article:{
        type: String,
        select: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'usersModel'
    }
})

const articleCommentSchema = new Schema({
    articleId: String,
    content: String,
    isFather: Boolean,
    commentId: {
        type: Schema.Types.ObjectId,
        ref: 'articleCommentModel'
    },
    commentUserId: {
        type: Schema.Types.ObjectId,
        ref: 'usersModel'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'usersModel'
    },
    replayData: Array,
},{ timestamps:true })


// const userEdit = new Schema({

// })
// 定义数据集合的模型，将schema和数据库中的集合关联起来
// model('模型名称','模型','表名')
const articleModel = model('articleModel', articleSchema, 'article')
const deleteArticleModel = model('deleteArticleModel', articleSchema, 'article')
const articleBriefModel = model('articleBriefModel', articleBriefSchema, 'article')
const articleCommentModel = model('articleCommentModel', articleCommentSchema, 'articleComment')
// 查找 usersModel.find({......数据})不写查找全部
// 新增 userModel.create({.....新增的数据})
// 删除 userModel.deleteOne({.....删除一条数据})
// 删除 userModel.deleteMany({.....删除所有符合条件的数据})
// 修改 userModel.updateOne({....查询的数据},{....修改的数据})


module.exports.articleModel = articleModel
module.exports.articleBriefModel = articleBriefModel
module.exports.deleteArticleModel = deleteArticleModel
module.exports.articleCommentModel = articleCommentModel