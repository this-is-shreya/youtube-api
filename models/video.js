const mongoose = require("mongoose")
const Schema = mongoose.Schema

const video = new Schema({
    title:String,
    videoId:String
})
module.exports = mongoose.model('video',video);