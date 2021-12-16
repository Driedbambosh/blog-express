const { articleModel, articleBriefModel, deleteArticleModel } = require('./models/articleModel')


module.exports.article = async function (article) {
    const data = await articleModel.create({
        userId: article.userId,
        ...article.article
    })

    return data
}

module.exports.articleBrief = async function ({ pageSize, pageNo }) {
    let count = await articleBriefModel.find().count()
    let data = await articleBriefModel.find().sort({'_id':-1}).skip((pageNo - 1) * pageSize).limit(pageSize - 0).populate('userId',{updated:0,passWord:0,autograph:0,isLogin:0,introduction:0})
    return {
        data,
        total: count
    }
}

module.exports.articleBriefId = async function (page) {
    let count = await articleBriefModel.find({userId:page.user}).count()
    let data = await articleBriefModel.find({userId:page.user}).skip((page.page.pageNo - 1) * page.page.pageSize).limit(page.page.pageSize - 0).populate('userId',{updated:0,passWord:0,autograph:0,isLogin:0,introduction:0})
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
    return await articleModel.findById(articleId).populate('userId',{updated:0,passWord:0,autograph:0,isLogin:0,introduction:0})// 字段筛选

}

module.exports.editArticle = async function (data) {
    return await articleModel.findByIdAndUpdate(data.id,data)

}

module.exports.articleComment = async function (data) {
    console.log(data);
    // return await articleModel.findByIdAndUpdate(data.id,data)

}