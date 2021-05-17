const mongoRepository = require('../data/mongo');
const { v4: uuidv4 } = require('uuid');
const { Review } = require('../models/review');


const reviewsCollectionName = "reviews";
const toiletsCollectionName = "toilets";
const dbName = process.env.DATABASENAME;

module.exports = {
    async createReview(data) {
        const uuid = uuidv4();
        const findQuery = { _id: data.toiletId };
        const existingToilet = await mongoRepository.getOneByQuery(dbName, toiletsCollectionName, findQuery);
        if (!existingToilet)
            throw new Error(`Toilet with ID: ${data.toiletId} does not exist!`);
        const reviewObj = new Review(uuid, data.rate, data.text, data.userId, data.toiletId);
        await mongoRepository.insertOne(dbName, reviewsCollectionName, reviewObj);
    },

    async updateReview(id, text, rate) {
        const findQuery = { _id: id };
        const updateQuery = { text: text, rate: rate };
        const existingReview = await mongoRepository.getOneByQuery(dbName, reviewsCollectionName, findQuery);
        if (!existingReview)
            throw new Error(`Review with ID: ${id} does not exist!`);
        await mongoRepository.updateOne(dbName, reviewsCollectionName, findQuery, { $set: updateQuery}); // client.updateOne({_id: 123}, { $set: { rate: 5, text: 'test' }})
    },

    async getReviewsByQuery(query) {
        const findQuery = {};
        if (query.userId) {
            findQuery.userId = query.userId;
        }
        if (query.toiletId) {
            findQuery.toiletId = query.toiletId;
        }
        const res = await mongoRepository.getManyByQuery(dbName, reviewsCollectionName, findQuery);
        return res;
    },

    async getOneReview(reviewId) {
        const findQuery = { _id : reviewId };
        const res = await mongoRepository.getOneByQuery(dbName, reviewsCollectionName, findQuery);
        return res;
    },

    async deleteReview(reviewId) {
        const findQuery = { _id : reviewId }
        await mongoRepository.deleteOne(dbName, reviewsCollectionName, findQuery);
    },

    async deleteAll() {
        await mongoRepository.deleteAll(dbName, reviewsCollectionName);
    }
}