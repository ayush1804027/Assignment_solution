const express=require("express");
const bodyparser=require("body-parser");
const axios = require('axios');
const cheerio = require('cheerio');
const app=express();


app.use(bodyparser.urlencoded({extended:true}));

class Result {
  constructor(title, link) {
    this.title = title;
    this.link = link;
  }
}
var res=[];
var obj;
const url = 'https://time.com/';
axios(url).then(function(html){
    //success!
  html=html.data;
  const $ = cheerio.load(html);
  $('.latest h2 a').each((i,el) => {
    const title= $(el).text();
    const link=url + $(el).attr('href');
    res.push(new Result(title,link));
  });
  obj= JSON.stringify(res);
  console.log(obj);
  })
  .catch(function(err){
    //handle error
    console.log(err);
  });


  app.route("/getTimeStories")

  .get(function(req, res){
    res.end(obj);
  });



app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running at port 3000 .");
});
