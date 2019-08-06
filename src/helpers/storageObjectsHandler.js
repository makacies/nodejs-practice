const reader = require('./fileReader.js');
const ID_FIELD = "id";

function getAllElements(path) {
    return JSON.parse(reader.readFile(path));
}

function getElementFromCollection(path, idValue) {
    const collection = JSON.parse(reader.readFile(path));
    return collection.find(item => item[ID_FIELD] === idValue);
}

function addElementToCollection(path, element, collectionSubname, idValue) {
    const collection = JSON.parse(reader.readFile(path));
    if (!collectionSubname) {
        collection.push(element);
    } else {
        const subElement = collection.find(item => item[ID_FIELD] === idValue);
        subElement[collectionSubname].push(element);
        collection[collection.indexOf(subElement)] = subElement;
    }
    reader.writeFile(path, collection)
}

function updateElementInCollection(path, idValue, value) {
    const collection = JSON.parse(reader.readFile(path));
    collection[getIndexOfElement(collection, idValue)] = value;
    reader.writeFile(path, collection)
}

function deleteElementFromCollection(path, idValue) {
    const collection = JSON.parse(reader.readFile(path));
    collection.splice(getIndexOfElement(collection, idValue), 1);
    reader.writeFile(path, collection)
}

function getIndexOfElement(collection, idValue) {
    const element = collection.find(item => item[ID_FIELD] === idValue);
    return collection.indexOf(element);
}

module.exports = {
    getAllElements,
    getElementFromCollection,
    addElementToCollection,
    updateElementInCollection,
    deleteElementFromCollection
};