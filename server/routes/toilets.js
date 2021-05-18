const express = require('express');
const router = express.Router();
const controller = require('../controllers/toilets');
const { upload } = require('../middleware/multipart');
const validations = require('../middleware/validations');
const parseJson = require('../middleware/parseJson');

router.post('/', upload.single('picture'), parseJson.parseJsonToiletItem,
 validations.validateCreateToiletSchema, controller.createToilet);
router.put('/:toiletId', upload.single('picture'), parseJson.parseJsonToiletItem,
 validations.validateUpdateToiletSchema, controller.updateToilet)
router.get('/', controller.getToiletsByQuery);
router.get('/:toiletId', controller.getOneToilet);
router.delete('/:toiletId', controller.deleteToilet);
router.delete('/', controller.deleteAll);

module.exports = router;