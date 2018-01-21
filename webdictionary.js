const scrapeIt = require("scrape-it")

const URL = "https://dictionary.com/browse/"
const DEFINITION_REGEX = /(\.|:)(\n|\s)/

/*
 * Define a given word using dictionary.com.
 * @param word - Word to define.
 * @param callback - Callback function with the definition as a parameter.
 */
exports.define = function(word, callback) {
    if (word === undefined || word == "") {
        console.log("Word is invalid: " + word)
        callback("Word not found.")
    }

    scrapeIt(URL + word,
        {
            definition: ".def-content"
        }
    ).then(page => {
        const definition = page.definition.split(DEFINITION_REGEX)[0]
        console.log("Got: " + definition)
        callback(definition)
    }, err => {
        callback("Error: " + err)
    })
}
