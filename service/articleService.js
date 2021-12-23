const { articleLabelBrief,article,articleBrief,articleBriefId,articleDetail,deleteArticle,editArticle,articleComment,getarticleComment } = require('../dao/articleDao')
// 发送文章
module.exports.sendArticle = async function (user) {
    const data = await article(user)
    return data
}
// 编辑文章
module.exports.editArticle = async function (data) {
    const data1 = await editArticle(data)
    return data1
}
// 删除文章
module.exports.deleteArticle = async function (user) {
    const data = await deleteArticle(user)
    return data
}
//获取文章列表(标签筛选)
module.exports.getArticleLabel = async function (data) {
    const data1 = await articleLabelBrief(data)
    return data1
}

//获取文章列表
module.exports.getArticle = async function (page) {
    const data = await articleBrief(page)
    return data
}

// 查询文章列表（查询当前用户）
module.exports.getArticleId = async function (pageUser) {
    const data = await articleBriefId(pageUser)
    return data
}
// 获取文章详情
module.exports.getArticleDetail = async function (articleId) {
    const data = await articleDetail(articleId)
    return data
}
// 发送文章评论
module.exports.sendArticleComment = async function (data) {
    const data1 = await articleComment(data)
    return data1
}
// 获取文章评论
module.exports.getArticleComment = async function (id,isFather) {
    const data = await getarticleComment(id,isFather)
    return data
}