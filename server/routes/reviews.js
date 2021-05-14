const express = require('express');
const router = express.Router();
const controller = require('../controllers/reviews');


router.post('/', controller.createReview);
router.put('/:reviewId', controller.updateReview)
router.get('/', controller.getReviewsByQuery);
router.get('/:reviewId', controller.getOneReview);
router.delete('/:reviewId', controller.deleteReview);
router.delete('/', controller.deleteAll);

module.exports = router;