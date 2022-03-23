const express = require('express')
const app = express()
const port = process.env.PORT||4821;
const bodyParser = require('body-parser');
const moment = require('moment')
const axios = require('axios')
app.locals.moment = moment;

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/test', function (req, res) {
  res.status(200).send('Test successful')
})


// template engine
app.use(express.static('public'))
app.set('view engine','ejs')

app.use(bodyParser.urlencoded({ extended: true }));

app.set('views','./views')

app.get('/news',async(req,res)=>{
  try {
      var url = 'https://newsapi.org/v2/top-headlines?' +
        'country=us&' +
        'category=sports&'+
        'apiKey=6c9865edf6224bb3813f745119fe94fb';

      const news_get =await axios.get(url)
      res.send(news_get.data.articles)
      console.log(news_get.data.articles)

  } catch (error) {
      if(error.response){
          console.log(error)
      }

  }
})

export default {
  path: '/api',
  handler: app
}
