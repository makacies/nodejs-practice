const reader = require('./fileReader.js');

function getAllElements(path) {
    return JSON.parse(reader.readFile(path));
}

function getElementFromCollection(path, idFieldName, idValue) {
    const collection = JSON.parse(reader.readFile(path));
    return collection.find(item => item[idFieldName] === idValue);
}

function addElementToCollection(path, element, collectionSubname, idFieldName, idValue) {
    const collection = JSON.parse(reader.readFile(path));
    if (!collectionSubname) {
        collection.push(element);
    } else {
        const subElement = collection.find(item => item[idFieldName] === idValue);
        subElement[collectionSubname].push(element);
        collection[collection.indexOf(subElement)] = subElement;
    }
    reader.writeFile(path, collection)
}

function updateElementInCollection(path, idFieldName, idValue, value) {
    const collection = JSON.parse(reader.readFile(path));
    collection[getIndexOfElement(collection, idFieldName, idValue)] = value;
    reader.writeFile(path, collection)
}

function deleteElementFromCollection(path, idFieldName, idValue) {
    const collection = JSON.parse(reader.readFile(path));
    collection.splice(getIndexOfElement(collection, idFieldName, idValue), 1);
    reader.writeFile(path, collection)
}

function getIndexOfElement(collection, idFieldName, idValue) {
    const element = collection.find(item => item[idFieldName] === idValue);
    return collection.indexOf(element);
}

module.exports = {
    getAllElements,
    getElementFromCollection,
    addElementToCollection,
    updateElementInCollection,
    deleteElementFromCollection
};