const mongoRepository = require('../data/mongo');
const { v4: uuidv4 } = require('uuid');
const { Toilet } = require('../models/toilets');



const collectionName = "toilets";
const dbName = process.env.DATABASENAME;

module.exports = {
    async createToilet(data) {
        const uuid = uuidv4();
        const toiletObj = new Toilet(uuid, data.name, data.price, data.location, data.text, data.unisex, data.numCells, data.babyChangingStations);
        await mongoRepository.insertOne(dbName, collectionName, toiletObj);
    },

    async updateToilet(id, data) {
        const findQuery = { _id: id };
        const updateQuery = buildUpdateQuery(data);
        const existingToilet = await mongoRepository.getOneByQuery(dbName, collectionName, findQuery);
        if (!existingToilet)
            throw new Error(`Toilet with ID: ${id} does not exist!`);
        await mongoRepository.updateOne(dbName, collectionName, findQuery, { $set: updateQuery });
    },

    async getToiletsByQuery(query) {
        const findQuery = {};
        const res = await mongoRepository.getManyByQuery(dbName, collectionName, findQuery);
        return res;
    },

    async getOneToilet(toiletId) {
        const findQuery = { _id: toiletId };
        const res = await mongoRepository.getOneByQuery(dbName, collectionName, findQuery);
        return res;
    },

    async deleteToilet(toiletId) {
        const findQuery = { _id: toiletId }
        await mongoRepository.deleteOne(dbName, collectionName, findQuery);
    },

    async deleteAll() {
        await mongoRepository.deleteAll(dbName, collectionName);
    }
}

function buildUpdateQuery(data) {
    const updateQuery = {};
    if (data.name)
        updateQuery.name = data.name;
    if (data.price)
        updateQuery.price = data.price;
    if (data.location)
        updateQuery.location = data.location;
    if (data.text)
        updateQuery.text = data.text;
    if (data.unisex)
        updateQuery.unisex = data.unisex;
    if (data.numCells)
        updateQuery.numCells = data.numCells;
    if (data.babyChangingStations)
        updateQuery.babyChangingStations = data.babyChangingStations;

    return updateQuery;
}