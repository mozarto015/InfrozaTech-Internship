const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl');
const shortUrl = require('./models/shortUrl');
const app = express()


mongoose.connect('mongodb://127.0.0.1:27017/url_shortener')
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

app.set('view engine','ejs')
app.use(express.urlencoded({ extended: false }))


app.get('/', async (req, res) => {
   const shortUrls = await ShortUrl.find()
   res.render('index' , { shortUrls: shortUrls })

})

app.post('/shortUrls',async (req, res) => {
   await shortUrl.create({ fullURL: req.body.fullURL })

   res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {
   const shortUrl = await ShortUrl.findOne({ shortURL: req.params.shortUrl })
   if (shortUrl == null) return res.sendStatus(404)

   shortUrl.clicks++
   await shortUrl.save()

   res.redirect(shortUrl.fullURL)
})

app.listen(process.env.PORT || 5000);