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

////////////////////////////////////////////// GET Request //////////////////////////////////
app.get("/",function(req,res){
  axios.get("https://coronavirus-19-api.herokuapp.com/countries")
  .then(function(response){
    var country =[];
    for(var i=0;i<response.data.length;i++){
      country.push(response.data[i].country);
    }
    var tc = numberWithCommas(response.data[0].cases);
    var td = numberWithCommas(response.data[0].deaths);
    var ta = numberWithCommas(response.data[0].active);
    var toc =numberWithCommas(response.data[0].todayCases);
    var tod =numberWithCommas(response.data[0].todayDeaths);
    var cr = numberWithCommas(response.data[0].critical);
    var cpm =numberWithCommas(response.data[0].casesPerOneMillion);
    var dpm =numberWithCommas(response.data[0].deathsPerOneMillion);
    res.render("home",{ta:ta,td:td,tc:tc,toc:toc,tod:tod,cr:cr,place:country,cpm:cpm,dpm:dpm});
  })
  .catch(function(err){
    console.log(err);
  });
});

app.get("/Country",function(req,res){
  axios.get("https://coronavirus-19-api.herokuapp.com/countries")
  .then(function(response){
    var country =[];
    for(var i=0;i<response.data.length;i++){
      country.push(response.data[i].country);
    }
    //console.log(country);
    //New Ideas!! 
    //REFACTOR THE CODE.
  res.render("country",{place:country});
  })

});


app.get("/World",function(req,res){
  axios.get("https://coronavirus-19-api.herokuapp.com/countries")
  .then(function(response){
    var tc = numberWithCommas(response.data[0].cases);
    var td = numberWithCommas(response.data[0].deaths);
    var ta = numberWithCommas(response.data[0].active);
    var tr = numberWithCommas(response.data[0].recovered);
    var toc =numberWithCommas(response.data[0].todayCases);
    var tod =numberWithCommas(response.data[0].todayDeaths);
    var cr = numberWithCommas(response.data[0].critical);
    var cpm =numberWithCommas(response.data[0].casesPerOneMillion);
    var dpm =numberWithCommas(response.data[0].deathsPerOneMillion);
    res.render("world",{ta:ta,tr:tr,td:td,tc:tc,toc:toc,tod:tod,cr:cr});
  })
});

////////////////////////////////////////////// POST Request //////////////////////////////////

app.post("/place",function(req,res){
  var place = req.body.place;
  // console.log(place);
  axios.get("https://coronavirus-19-api.herokuapp.com/countries/"+place)
  .then(function(response){
    var country = response.data.country;
    var tc = numberWithCommas(response.data.cases);
    var td = numberWithCommas(response.data.deaths);
    var ta = numberWithCommas(response.data.active);
    var tr = numberWithCommas(response.data.recovered);
    var toc =numberWithCommas(response.data.todayCases);
    var tod =numberWithCommas(response.data.todayDeaths);
    res.render("place",{ta:ta,td:td,tc:tc,toc:toc,tod:tod,tr:tr,place:country});
  })
  .catch(function(err){
    console.log(err);
  });
});





app.listen(3000,function(){
  console.log("Server is up at 3000");
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
