module.exports = {
    async parseJsonToiletItem(req, res, next) {
        try {
            req.body.toiletItem = JSON.parse(req.body.toiletItem);
            return next();
        }
        catch (err) {
            return res.status(400).json(err);
        }
    }
}
