const express = require('express');
const router = express.Router();
const controller = require('../controllers/reviews');
const validations = require('../middleware/validations');

router.post('/', validations.validateCreateReviewSchema, controller.createReview);
router.put('/:reviewId', validations.validateUpdateReviewSchema, controller.updateReview)
router.get('/', controller.getReviewsByQuery);
router.get('/:reviewId', controller.getOneReview);
router.delete('/:reviewId', controller.deleteReview);
router.delete('/', controller.deleteAll);

module.exports = router;