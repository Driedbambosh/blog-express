const { articleModel,articleBriefModel,deleteArticleModel } = require('./models/articleModel')


module.exports.article = async function (article) {
    const data = await articleModel.create({
        userId: article.userId,
        ...article.article
    })
    

    return data
}

module.exports.articleBrief = async function () {
    return await articleBriefModel.find().populate('userId')

}
// 删除
module.exports.deleteArticle = async function () {
    return await deleteArticleModel.deleteOne()
}


module.exports.articleDetail = async function (articleId) {
    return await articleModel.find({
        _id: articleId
    }).populate('userId')

}