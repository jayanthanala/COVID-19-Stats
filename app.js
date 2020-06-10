const express = require('express');
const bodyParser = require('body-parser');
const ejs = require("ejs");
const axios = require('axios');
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine", 'ejs');
app.use(express.static("public"));


app.get("/",function(req,res){
  axios.get("https://coronavirus-19-api.herokuapp.com/countries")
  .then(function(response){
    var country =[];
    for(var i=0;i<response.data.length;i++){
      country.push(response.data[i].country);
    }
    var tc = response.data[0].cases;
    var td = response.data[0].deaths;
    var ta = response.data[0].active;
    var toc = response.data[0].todayCases;
    var tod = response.data[0].todayDeaths;
    var cr = response.data[0].critical;
    var cpm = response.data[0].casesPerOneMillion;
    var dpm = response.data[0].deathsPerOneMillion;

    res.render("home",{ta:ta,td:td,tc:tc,toc:toc,tod:tod,cr:cr,place:country,cpm:cpm,dpm:dpm});
  })

  .catch(function(err){
    console.log(err);
  });
});



app.listen(3000,function(){
  console.log("Server is up at 3000");
});
