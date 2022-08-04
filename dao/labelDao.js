const { labelModel } = require('./models/labelModel')


module.exports.label = async function (data) {
    const data1 = await labelModel.create({
        labelName: data.labelName,
        color: data.color,
    })

    return data1
}

module.exports.labelBrief = async function ({ pageSize, pageNo }) {
    let count = await labelModel.find().count()
    let data = await labelModel.find().sort({ '_id': -1 }).skip((pageNo - 1) * pageSize).limit(pageSize - 0)
    return {
        data,
        total: count
    }
}

// 删除
module.exports.deleteLabel = async function (id) {
    return await labelModel.findById(id).deleteOne()
}

module.exports.editLabel = async function (data) {
    console.log(data);
    return await labelModel.findByIdAndUpdate(data.id, data)

}