var express = require('express');
var path = require('path');
var router = express.Router();
const studentData = require(path.join(__dirname, '..', 'controller', 'schoolParser.js'))();
const searchSchools = require(path.join(__dirname, '..', 'controller', 'schoolSearch.js'));
const searchText = "ALBERTVILLE SCHOOL ELEMENTARY";
const searchResults = [];

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'nuffsaid-coding-challenge',
    product: 'Search',
    totalSchools: studentData.schoolCount,
    schoolByState: JSON.stringify(studentData.schoolCountByState),
    schoolByMetro: JSON.stringify(studentData.schoolCountByMetro),
    cityMostSchool: studentData.cityWithMaxSchools,
    uniqueCities: studentData.unqiueCities,
    searchResults: searchResults
  });
});

console.log('=========== search results ==============');
console.time('Search response time in ms');


const result = searchSchools(searchText);

result.then((data) => {

  if (data.length === 0) {
    searchResults.push({
      schoolName: 'Next Best Hit',
      city: '',
      state: ''
    });
  }

  data.map((row) => {
    if (row) {
      searchResults.push({
        schoolName: row.SCHNAM05,
        city: row.LCITY05,
        state: row.LSTATE05
      })

    }
  })

  console.timeEnd('Search response time in ms');
})




module.exports = router;
