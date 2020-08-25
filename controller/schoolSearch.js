const csv = require('csv-parser')
const fs = require('fs')
const path = require('path');

const searchData = require(path.join(__dirname, '..', 'dao', 'searchDao.js'));

async function searchSchools(searchText) {

    return new Promise((resolve, reject) => {
        // remove special chars from input
        searchText = searchText.replace(/[^\w\s]/gi, '');
        let searchArr = searchText.split(' ');



        var file = fs.createReadStream(path.join(__dirname, '..', 'school_data.csv'));

        file
            .pipe(csv())
            .on('data', (data) => {

                // search JSON data 
                for (let w = 0; w < searchArr.length; w++) {

                    // remove null chars 
                    if (searchArr[w].length <= 0) {
                        searchArr.splice(w, 1);
                    }

                    try {

                        //remove special characters from the school name
                        data.SCHNAM05 = data.SCHNAM05.replace(/[^\w\s]/gi, '');



                        /**
                         * Search the words in the school name 
                         */

                        if (data.SCHNAM05 && searchArr[w]) {

                            let pattern = new RegExp(`(^|\\s)${searchArr[w].trim()}[.]*`, 'i');


                            if (pattern.test(data.SCHNAM05.trim())) {
                                // school name matched

                                let rowExist = searchData.find((row) => row.NCESSCH === data.NCESSCH);

                                if (typeof rowExist === "undefined") {
                                    searchData.push(data);
                                }

                                // remove word from the array, to avpid duplicate data like 'school' 
                                searchArr.splice(w, 1);
                            }
                        }


                        /**
                         * 
                         * Search the words in the city 
                         */
                        if (data.LCITY05 && searchArr[w]) {

                            let pattern = new RegExp(`(^|\\s)${searchArr[w].trim()}[.]*`, 'i');

                            if (pattern.test(data.LCITY05.trim())) {
                                // school name matched

                                let rowExist = searchData.find((row) => row.NCESSCH === data.NCESSCH);

                                if (typeof rowExist === "undefined") {
                                    searchData.push(data);
                                }

                                // remove word from the array, to avpid duplicate data like 'school' 
                                searchArr.splice(w, 1);
                            }
                        }

                        //resolve file
                        if (searchArr.length === 0) {
                            file.close();
                            return resolve(searchData);
                        }

                    }
                    catch (e) {
                        //console.log(e)
                        return reject(e);
                    }
                }

            })
            .on('end', () => {

                return resolve(searchData);
                // return searchData;
                // console.log(searchData);

            });
        return searchData;
    })
}



// module.exports.searchSchools = async function (searchText) {
//      await searchSchools(searchText);
// };

module.exports = searchSchools;