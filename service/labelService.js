const { label,labelBrief,deleteLabel,editLabel } = require('../dao/labelDao')

// 新增标签
module.exports.sendLabel = async function (data) {
    const data1 = await label(data)
    return data1
}

//获取标签列表
module.exports.getLabelList = async function (page) {
    const data = await labelBrief(page)
    return data
}

// 删除标签
module.exports.deleteLabel = async function (user) {
    const data = await deleteLabel(user)
    return data
}

// 编辑标签
module.exports.editLabel = async function (data) {
    const data1 = await editLabel(data)
    return data1
}
