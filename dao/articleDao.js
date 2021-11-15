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
    let data = await articleBriefModel.find().skip((pageNo - 1) * pageSize).limit(pageSize - 0).populate('userId')
    return {
        data,
        total: count
    }
}
// 删除
module.exports.deleteArticle = async function () {
    return await deleteArticleModel.deleteOne()
}


module.exports.articleDetail = async function (articleId) {
    return await articleModel.findById(articleId).populate('userId')

}

module.exports.editArticle = async function (data) {
    return await articleModel.findByIdAndUpdate(data.id,data)

}