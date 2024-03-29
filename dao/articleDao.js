const e = require('express')
const { articleModel, articleBriefModel, deleteArticleModel, articleCommentModel } = require('./models/articleModel')


module.exports.article = async function (article) {
    const data = await articleModel.create({
        userId: article.userId,
        ...article.article
    })

    return data
}

module.exports.articleBrief = async function ({ pageSize, pageNo }) {
    let count = await articleBriefModel.find().count()
    let data = await articleBriefModel.find().sort({ '_id': -1 }).skip((pageNo - 1) * pageSize).limit(pageSize - 0).populate('userId', { updated: 0, passWord: 0, autograph: 0, isLogin: 0, introduction: 0 })
    return {
        data,
        total: count
    }
}

module.exports.articleLabelBrief = async function (data) {
    let count = await articleBriefModel.find({ label: { $elemMatch: { _id: data.labelId } } }).count()
    let data1 = await articleBriefModel.find({ label: { $elemMatch: { _id: data.labelId } } }).sort({ '_id': -1 }).skip((data.pageNo - 1) * data.pageSize).limit(data.pageSize - 0).populate('userId', { updated: 0, passWord: 0, autograph: 0, isLogin: 0, introduction: 0 })
    return {
        data1,
        total: count
    }
}

module.exports.articleBriefId = async function (page) {
    let count = await articleBriefModel.find({ userId: page.user }).count()
    let data = await articleBriefModel.find({ userId: page.user }).skip((page.page.pageNo - 1) * page.page.pageSize).limit(page.page.pageSize - 0).populate('userId', { updated: 0, passWord: 0, autograph: 0, isLogin: 0, introduction: 0 })
    return {
        data,
        total: count
    }
}
// 删除
module.exports.deleteArticle = async function (id) {
    return await deleteArticleModel.findById(id).deleteOne()
}

module.exports.articleDetail = async function (articleId) {
    let data = {}
    let isHave = false
    data = await articleModel.findById(articleId, function (err, doc) {
        if (err !== null) {
            isHave = true

        }
        return
    }).populate('userId', { updated: 0, passWord: 0, autograph: 0, isLogin: 0, introduction: 0 }).clone().catch(function (err) {

    })// 字段筛选
    if (isHave) {
        data = {
            status: 404,
            message: '没有此文章'
        }
    }
    return data
}

module.exports.editArticle = async function (data) {
    return await articleModel.findByIdAndUpdate(data.id, data)

}

module.exports.articleComment = async function (data) {
    return await articleCommentModel.create({
        ...data
    })
}

module.exports.getarticleComment = async function (id, isFather) {
    let flag = true
    if (isFather == 1) {
        flag = true
    } else {
        flag = false
    }
    // 查询父数据
    let data = await articleCommentModel.find({ articleId: id, isFather: flag }).populate('commentUserId').populate('userId', { updated: 0, passWord: 0, autograph: 0, isLogin: 0, introduction: 0 })
    await Promise.all(data.map(async (item) => {
        // 等待异步操作完成，返回执行结果
        item.replayData = await articleCommentModel.find({ commentId: item._id }).populate('userId', { updated: 0, passWord: 0, autograph: 0, isLogin: 0, introduction: 0 }).populate('commentUserId', { updated: 0, passWord: 0, autograph: 0, isLogin: 0, introduction: 0 })
    }));
    return data
}


