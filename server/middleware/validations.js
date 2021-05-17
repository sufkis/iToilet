const Joi = require('joi');

const createReviewSchema = Joi.object({
    text: Joi.string().required(),
    rate: Joi.number().required(),
    userId: Joi.string().required(),
    toiletId: Joi.string().required(),
})

const createToiletSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number(),
    location: Joi.string().required(),
    text: Joi.string(),
    unisex: Joi.string(),
    numCells: Joi.number(),
    babyChangingStations: Joi.string(),
})

const updateReviewSchema = Joi.object({
    text: Joi.string().required(),
    rate: Joi.number().required(),
})

const updateToiletSchema = Joi.object({
    name: Joi.string(),
    price: Joi.number(),
    location: Joi.string(),
    text: Joi.string(),
    unisex: Joi.string(),
    numCells: Joi.number(),
    babyChangingStations: Joi.string(),
})


module.exports = {
    async validateCreateReviewSchema (req, res, next) {
        try {
            await createReviewSchema.validateAsync({ ...req.body}, { convert: false});
            return next();
        }
        catch (err) {
            return res.status(400).json(err);
        }
    },
    async validateCreateToiletSchema (req, res, next) {
        try {
            await createToiletSchema.validateAsync({ ...req.body}, { convert: false});
            return next();
        }
        catch (err) {
            return res.status(400).json(err);
        }
    },

    async validateUpdateReviewSchema (req, res, next) {
        try {
            await updateReviewSchema.validateAsync({ ...req.body}, { convert: false});
            return next();
        }
        catch (err) {
            return res.status(400).json(err);
        }

    },

    async validateUpdateToiletSchema (req, res, next) {
        try {
            await updateToiletSchema.validateAsync({ ...req.body}, { convert: false});
            return next();
        }
        catch (err) {
            return res.status(400).json(err);
        }

    }
}