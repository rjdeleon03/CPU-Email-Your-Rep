const SortedMap = require("collections/sorted-map");

const NOTES = ["MINORITY LEADER", "PRINCIPAL AUTHOR"];

const repsUtils = {
    get: (papa, file, complete, error) => {
        papa.parse(file, {
            delimiter: ",",
            complete: (result) => {

                var repsMap = new SortedMap();

                console.log(result);

                if (result.data == null || result.data.length < 2) {
                    error();
                    return;
                }
                try {
                    const headerArray = result.data[0];
                    const indices = {
                        name: headerArray.indexOf("NAME"),
                        district: headerArray.indexOf("DISTRICT"),
                        vote: headerArray.indexOf("VOTE"),
                        email: headerArray.indexOf("EMAIL"),
                        twitter: headerArray.indexOf("TWITTER"),
                        facebook: headerArray.indexOf("FACEBOOK")
                    };


                    // Remove first item
                    result.data.shift();

                    result.data.forEach((item) => {
                        if (item.length < 2) {
                            return;
                        }

                        const rep = {
                            name: item[indices.name].substring(5),
                            district: item[indices.district],
                            votedYes: item[indices.vote] == "Yes" ? true : false,
                            email: item[indices.email].split(" "),
                            twitter: item[indices.twitter],
                            facebook: item[indices.facebook],
                        }

                        NOTES.forEach(note => {
                            if (rep.name.indexOf(note) != -1) {
                                rep.name = rep.name.replace(note, "").trim();
                                rep.note = note;
                            }
                        })

                        repsMap.set(rep.name, rep);
                    });
                    complete(Array.from(repsMap.values()));
                } catch (_) {
                    error();
                }
            },
        });
    },
}

module.exports = repsUtils;

/*
const testingRankingsUtils = {
    get: (papa, file, complete, error) => {
        papa.parse(file, {
            complete: (result) => {
                var testingCountriesMap = new SortedMap();
                var testingCountriesMapSEA = new SortedMap();

                if (result.data == null || result.data.length < 2) {
                    error();
                    return;
                }

                try {

                    const headerArray = result.data[0];
                    // console.log(headerArray);

                    const indices = {
                        isocode: headerArray.indexOf("iso_code"),
                        country: headerArray.indexOf("location"),
                        date: headerArray.indexOf("date"),
                        testsPerThousand: headerArray.indexOf("total_tests_per_thousand")
                    };

                    // Remove first item
                    result.data.shift();

                    result.data.forEach((item) => {
                        if (item.length < 2) {
                            return;
                        }
                        const testingDataPerCountry = {
                            isocode: item[indices.isocode],
                            country: item[indices.country],
                            dateLastUpdated: item[indices.date],
                            testsPerThousand: item[indices.testsPerThousand]
                        };
                        if (testingDataPerCountry.isocode !== ""
                            && testingDataPerCountry.isocode !== "OWID_WRL"
                            && testingDataPerCountry.testsPerThousand !== "") {
                            // console.log(testingDataPerCountry.testsPerThousand);
                            // console.log(testingDataPerCountry.country + " -- " + testingDataPerCountry.dateLastUpdated + " --" + testingDataPerCountry.testsPerThousand);

                            testingDataPerCountry.testsPerThousand = parseFloat(testingDataPerCountry.testsPerThousand);
                            testingCountriesMap.set(testingDataPerCountry.isocode, testingDataPerCountry);

                            if ("IDN+MYS+MMR+PHL+SGP+THA+VNM+BRN+LAO+TLS+KHM".indexOf(testingDataPerCountry.isocode) > -1) {
                                testingCountriesMapSEA.set(testingDataPerCountry.isocode, testingDataPerCountry);

                            }
                        }
                    });

                    const sortedSEAList = Array.from(testingCountriesMapSEA.values()).sort((a, b) => b.testsPerThousand - a.testsPerThousand);
                    const sortedWorldList = Array.from(testingCountriesMap.values()).sort((a, b) => b.testsPerThousand - a.testsPerThousand);

                    // console.log(sortedSEAList);
                    // console.log(sortedWorldList);

                    // const entries = Array.from(testingCountriesMap.values());

                    const rankingSEA = sortedSEAList.findIndex((a) => a.isocode === "PHL");
                    // console.log(rankingSEA + " / " + sortedSEAList.length);
                    const rankingWorldWide = sortedWorldList.findIndex((a) => a.isocode === "PHL");
                    // console.log(rankingWorldWide + " / " + sortedWorldList.length);
                    // entries.forEach((entry) => {
                    //   console.log(entry)
                    // });
                    complete({
                        rankingSEA: rankingSEA + 1,
                        totalSEA: sortedSEAList.length,
                        rankingWorldWide: rankingWorldWide + 1,
                        totalWorldWide: sortedWorldList.length,
                        dateLastUpdated: sortedSEAList[rankingSEA].dateLastUpdated,
                        topFiveWorldWide: sortedWorldList.slice(0, 5)
                    });

                } catch (_) {
                    error();
                }
            },
        });
    },
};
*/

