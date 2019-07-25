const reader = require('../helpers/fileReader.js');

function getAllElements(path) {
    return JSON.parse(reader.readFile(path));    
}

function getElementFromCollection(path, idFieldName, idValue) {
    const collection = JSON.parse(reader.readFile(path));
    return collection.find(item => item[idFieldName] === idValue);
}

function addElementToCollection(path, element) {
    const collection = JSON.parse(reader.readFile(path));
    collection.Push(element);    
    // Update all data in file, not add
    reader.writeFile(path, collection)
}

function updateElementToCollection(path, idFieldName, idValue, value) {
    const collection = JSON.parse(reader.readFile(path));
    collection[getIndexOfElement(collection, idFieldName, idValue)] = value;
}

function deleteElementFromCollection(path, idFieldName, idValue) {
    const collection = JSON.parse(reader.readFile(path));
    collection.splice(getIndexOfElement(collection, idFieldName, idValue), 1);
}

function getIndexOfElement(collection, idFieldName, idValue)
{
    const element = collection.find(item => item[idFieldName] === idValue);
    return indexOf(element);
}

module.exports = {
    getAllElements,
    getElementFromCollection,
    addElementToCollection,
    updateElementToCollection,
    deleteElementFromCollection
};
