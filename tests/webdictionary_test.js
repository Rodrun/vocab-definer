const webdictionary = require(".././webdictionary.js")

exports.define_not_undefined = function(test) {
    webdictionary.define("heredity", (def) => {
        let definition = def

        test.expect(1)
        test.notEqual(definition, undefined, "Undefined definition")
        test.done()
    })
}
