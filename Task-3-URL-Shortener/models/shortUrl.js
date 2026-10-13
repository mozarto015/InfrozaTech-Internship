const mongoose = require('mongoose')
const shortId = require('shortid')


const shortUrlSchema = new mongoose.Schema({
    fullURL: { type: String, required: true },
    shortURL: { type: String, required: true, default: shortId.generate() },
    clicks: { type: Number, required: true, default: 0 }
})

shortUrlSchema.pre('save', function() {
    if (!this.shortURL) {
        this.shortURL = shortId.generate();
    }
});

module.exports = mongoose.model('ShortUrl', shortUrlSchema)
