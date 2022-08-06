const { Schema, model } = require('mongoose')

const labelSchema = new Schema({
    labelName: String,
    color: String,
},{ timestamps:true })

const labelModel = model('labelModel', labelSchema, 'label')


module.exports.labelModel = labelModel
