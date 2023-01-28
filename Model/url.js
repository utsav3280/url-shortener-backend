const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Url_Schema = new Schema({
    short_url: {type: String},
    original_url: {type: String},
    click_count: {type: Number, default: 0}
})

const Url = mongoose.model("Url", Url_Schema);

module.exports = Url;