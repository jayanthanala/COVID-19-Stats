const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine", 'ejs');
app.use(express.static("public"));

////////////////////////////////////////////// GET Request //////////////////////////////////
app.get("/", function(req, res) {
  axios.get("https://coronavirus-19-api.herokuapp.com/countries")
    .then(function(response) {
      var country = [];
      for (var i = 0; i < response.data.length; i++) {
        country.push(response.data[i].country);
      }
      var d = response.data[0];
      var data = response.data;
      res.render("home", {
        d: d,
        data:data,
        place: country,
        fun: numberWithCommas
      });
    })
    .catch(function(err) {
      console.log(err);
    });
});

app.get("/Country", function(req, res) {
  axios.get("https://coronavirus-19-api.herokuapp.com/countries")
    .then(function(response) {
      var country = [];
      for (var i = 0; i < response.data.length; i++) {
        country.push(response.data[i].country);
      }
      res.render("country", {
        place: country
      });
    })
    .catch(function(err) {
      console.log(err);
    });
});

app.get("/World", function(req, res) {
  var country = [];
  var totalCases = [];
  var totalTests = [];
  var totalRecover = [];

  axios.get("https://coronavirus-19-api.herokuapp.com/countries")
    .then(function(response) {

      var d = response.data[0];
      var dat = response.data.slice(1,);
      var color = "dark";
      //console.log(dat);
      var data = response.data.slice(1, );
      //console.log(data);
      var tc = data.sort(function(a, b) {
        return b.cases - a.cases
      }).slice(0, 5);
      var td = data.sort(function(a, b) {
        return b.deaths - a.deaths
      }).slice(0, 5);
      var tr = data.sort(function(a, b) {
        return b.recovered - a.recovered
      }).slice(0, 5);
      var ta = data.sort(function(a, b) {
        return b.active - a.active
      }).slice(0, 5);
      res.render("world", {
        d: d,
        fun: numberWithCommas,
        tc: tc,
        td: td,
        tr: tr,
        ta: ta,
        data:dat,
        tbu: "To-Be-Updated",
        bg: color
      });
    })
});
//

app.get("/search/state/district",(req,res) => {
  axios.get("https://api.covidindiatracker.com/state_data.json")
  .then((response) => {
    var data = response.data;
    res.render("disearch",{data:data});
  });
});

app.get("/india",(req,res) => {
  axios.get("https://api.covidindiatracker.com/state_data.json")
  .then((response) => {
    var state = req.query.state;
    res.render("district",{data:response.data, s:state,fun: numberWithCommas});
  })
});

////////////////////////////////////////////// POST Request //////////////////////////////////

app.post("/place", function(req, res) {
  var place = req.body.place;
  // console.log(place);
  axios.get("https://coronavirus-19-api.herokuapp.com/countries/" + place)
    .then(function(response) {
      var country = response.data.country;
      var d = response.data;
      res.render("place", {
        d: d,
        fun: numberWithCommas,
        place: country
      });
    })
    .catch(function(err) {
      console.log(err);
    });
});



////////////////////////////////////////////// PORTS /////////////////////////////////////////

app.listen(3000, function() {
  console.log("Server is up at 3000");
});

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
