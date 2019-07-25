var fs = require("fs");

function writeFile(file, data) {
    fs.writeFile(file, data);
}

function readFile(file) {
    return fs.readFileSync(file);
};

module.exports = {
    writeFile,
    readFile
};
