var express = require('express');
var router = express.Router();

var countries = require('../data').countries;


// convert countries to a hashmap
var index_names = {};
for (var i = 0, len = countries.length; i < len; i++) {
    var countryname = countries[i].name.toLowerCase();
    // console.log(countryname);
    if (!( countryname in index_names )) {
      index_names[countryname] = i;
    }
}

console.log(index_names);

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/countries/:name', function(req, res) {
  console.log(req.params.name);
  if ( req.params.name in index_names ) {
    res.status(200).json({ country: countries[index_names[req.params.name]] });
  } else {
    res.status(400).json({ message: 'info not found' });
  }

});

module.exports = router;
