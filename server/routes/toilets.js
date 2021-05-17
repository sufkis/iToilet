const express = require('express');
const router = express.Router();
const controller = require('../controllers/toilets');
const validations = require('../middleware/validations');
   

router.post('/',  validations.validateCreateToiletSchema, controller.createToilet);
router.put('/:toiletId', validations.validateUpdateToiletSchema, controller.updateToilet)
router.get('/', controller.getToiletsByQuery);
router.get('/:toiletId', controller.getOneToilet);
router.delete('/:toiletId', controller.deleteToilet);
router.delete('/', controller.deleteAll);

module.exports = router;