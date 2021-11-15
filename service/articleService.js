const { article,articleBrief,articleDetail,deleteArticle,editArticle } = require('../dao/articleDao')
module.exports.sendArticle = async function (user) {
    const data = await article(user)
    return data
}

module.exports.editArticle = async function (data) {
    const data1 = await editArticle(data)
    return data1
}

module.exports.deleteArticle = async function (user) {
    const data = await deleteArticle(user)
    return data
}

module.exports.getArticle = async function (page) {
    const data = await articleBrief(page)
    return data
}

module.exports.getArticleDetail = async function (articleId) {
    const data = await articleDetail(articleId)
    return data
}