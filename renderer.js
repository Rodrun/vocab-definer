$(() => {
    const webdictionary = require("./webdictionary.js")

    /*
     * Regex to parse possibly cluttered/unclean vocab list.
     * This accepts '-',  or tabs as a 'delimiter' and notices shortened
     * "word type identifiers" e.g. "adj." or "(n.)" or "(noun)" etc. etc. If it
     * has a period after or is surrounded by parenthesis, it is assumed it is
     * not part of the actual vocabulary word.
     *
     * See: https://regex101.com/r/VyYZkZ/7 for visual
     */
    const REGEX = /(([\s*](-|\t)\s*)|\(*\w*\s*\.\)*|\(\w*\))/
    /*
     * To use to separate the vocabulary word and its definition.
     */
    let delimiter = "\t"
    /*
     * Original text inside the editor before defining.
     */
    let originalText = $("#editor").val()

    /*
     * Append a new line of text to a textarea.
     * @param id - Id of the textarea.
     * @param text - Text to append.
     */
    function appendLineToTextarea(id, text) {
        let txt = $(id).val()
        // No need to append newline if the editor is empty
        let newline = txt == "" ? "" : "\n"
        $(id).val(txt + newline + text)
    }

    /// Define button click event
    $("#btnDefine").on("click", () => {
        // Get editor text with vocab words
        originalText = $("#editor").val()
        // Clear the editor to prepare appending
        $("#editor").val("")
        // Parse text & define words
        let vocabLines = originalText.split("\n") // All of the lines in editor
        for (const line of vocabLines) {
            const word = line.split(REGEX, 1)
            webdictionary.define(word, (def) => {
                appendLineToTextarea("#editor", word + delimiter + def)
            })
        }
    })

    /// Recover button click event
    $("#btnRecover").on("click", () => {
        $("#editor").val(originalText)
    })
})
