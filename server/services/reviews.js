const mongoRepository = require('../data/mongo');
const { v4: uuidv4 } = require('uuid');


const collectionName = "reviews";
const dbName = process.env.DATABASENAME;

module.exports = {
    async createReview(data) {
        // todo - consider Joi validations
        if (data.rate && data.text && data.userId && data.toiletId) {
            data._id = uuidv4();
            await mongoRepository.insertOne(dbName, collectionName, data);
        }
        else {
            throw new Error("invalid body for the request!")
        }
    },

    async updateReview(id, text, rate) {
        const findQuery = { _id: id };
        const updateQuery = { text: text, rate: rate };
        const existingReview = await mongoRepository.getOneByQuery(dbName, collectionName, findQuery);
        if (!existingReview)
            throw new Error(`Review with ID: ${id} does not exist!`);
        await mongoRepository.updateOne(dbName, collectionName, findQuery, { $set: updateQuery}); // client.updateOne({_id: 123}, { $set: { rate: 5, text: 'test' }})
    },

    async getReviewsByQuery(query) {
        const findQuery = {};
        if (query.userId) {
            findQuery.userId = query.userId;
        }
        if (query.toiletId) {
            findQuery.toiletId = query.toiletId;
        }
        const res = await mongoRepository.getManyByQuery(dbName, collectionName, findQuery);
        return res;
    },

    async getOneReview(reviewId) {
        const findQuery = { _id : reviewId };
        const res = await mongoRepository.getOneByQuery(dbName, collectionName, findQuery);
        return res;
    },

    async deleteReview(reviewId) {
        const findQuery = { _id : reviewId }
        await mongoRepository.deleteOne(dbName, collectionName, findQuery);
    },

    async deleteAll() {
        await mongoRepository.deleteAll(dbName, collectionName);
    }
}