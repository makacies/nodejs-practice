var fs = require("fs");

function writeFile(file, data) {
    fs.writeFile(file, JSON.stringify(data), function (err, result) {
        if (err) throw err;
    });
}

function readFile(file) {
    return fs.readFileSync(file, function (err, result) {
        if (err) throw err;
    });
};

module.exports = {
    writeFile,
    readFile
};