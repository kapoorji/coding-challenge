const csv = require('csv-parser')
const fs = require('fs')
var path = require('path');
const schoolData = require(path.join(__dirname, '..', 'dao', 'studentDao.js'));
const searchData = require(path.join(__dirname, '..', 'dao', 'searchDao.js'));

function parseSchoolData() {

    fs.createReadStream(path.join(__dirname, '..', 'school_data.csv'))
        .pipe(csv())
        .on('data', (data) => {

            // search JSON data 
            // searchData.push(data);

            //validate school name and increment total school counter 
            if (data && data.SCHNAM05) {
                schoolData.schoolCount++;
            }

            //validate school and increment school counter by state 
            if (data && data.LSTATE05) {


                // check state 
                if (typeof (schoolData.schoolCountByState[data.LSTATE05]) != "undefined") {
                    schoolData.schoolCountByState[data.LSTATE05]++
                } else {
                    schoolData.schoolCountByState[data.LSTATE05] = 0
                }

            }

            //validate school and increment as per metro centric locale 
            if (data && data.MLOCALE) {

                // check metro locale 
                if (typeof (schoolData.schoolCountByMetro[data.MLOCALE]) != "undefined") {
                    schoolData.schoolCountByMetro[data.MLOCALE]++
                } else {
                    schoolData.schoolCountByMetro[data.MLOCALE] = 0
                }

            }

            //validate school and increment as per city
            if (data && data.LCITY05) {

                // check city 
                if (typeof (schoolData.cityMapper[data.LCITY05]) != "undefined") {
                    schoolData.cityMapper[data.LCITY05]++
                } else {
                    schoolData.cityMapper[data.LCITY05] = 0
                }
            }

        })
        .on('end', () => {

            // check city with max schools
            if (schoolData && schoolData.cityMapper) {
                let maxCityName = Object.keys(schoolData.cityMapper).reduce(function (a, b) { return schoolData.cityMapper[a] > schoolData.unqiueCities[b] ? a : b });
                schoolData.cityWithMaxSchools = maxCityName;
            }

            // unqiueCities count with almost 1 school
            if (schoolData && schoolData.cityMapper) {
                let count = 0;
                for (let city in schoolData.cityMapper) {

                    if (schoolData.cityMapper[city] > 0) {
                        count++
                    }
                }
                schoolData.unqiueCities = count;
            }

        });
    return schoolData;
}



module.exports = parseSchoolData;