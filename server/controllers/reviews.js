const express = require('express');
const router = express.Router();
const reviewService = require('../services/reviews');

module.exports = {

    async createReview(req, res) {
        try {
            await reviewService.createReview(req.body);
            res.send();
        }
        catch (err) {
            console.log(err);
            res.status(500).send({ message: err.message });
        }
    },

    async updateReview(req, res) {
        const { text, rate } = req.body;
        try {
            await reviewService.updateReview(req.params.reviewId, text, rate);
            res.send();
        }
        catch (err) {
            console.log(err);
            res.status(500).send({ message: err.message });
        }
    },

    async getReviewsByQuery(req, res) {   // https://localhost:5000/reviews?userId=123&toiletId=321
        try {
            const results = await reviewService.getReviewsByQuery(req.query);
            res.send(results);
        }
        catch (err) {
            console.log(err);
            res.status(500).send({ message: err.message });
        }
    },

    async getOneReview(req, res) {
        try {
            const result = await reviewService.getOneReview(req.params.reviewId);
            res.send(result);
        }
        catch (err) {
            console.log(err);
            res.status(500).send({ message: err.message });
        }
    },

    async deleteReview(req, res) {
        try {
            await reviewService.deleteReview(req.params.reviewId);
            res.send({ message: 'deleted successfully' });
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: err.message });
        }
    },

    async deleteAll(req, res) {
        try {
            await reviewService.deleteAll();
            res.send({ message: 'deleted successfully' });
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: err.message });
        }
    }
}
