const { article,articleBrief,articleDetail,deleteArticle } = require('../dao/articleDao')
module.exports.sendArticle = async function (user) {
    const data = await article(user)
    return data
}
module.exports.deleteArticle = async function (user) {
    const data = await deleteArticle(user)
    return data
}

module.exports.getArticle = async function () {
    const data = await articleBrief()
    return data
}

module.exports.getArticleDetail = async function (articleId) {
    const data = await articleDetail(articleId)
    return data
}