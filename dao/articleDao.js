const { articleModel,articleBriefModel } = require('./models/articleModel')


module.exports.article = async function (article) {
    const data = await articleModel.create({
        userId: article.userId,
        ...article.article
    })
    

    return data
}

module.exports.articleBrief = async function () {
    return await articleBriefModel.find()

}
