const toiletService = require('../services/toilets');

module.exports = {

    async createToilet(req, res) {
        try {
            await toiletService.createToilet(req.body.toiletItem, req.file);
            res.send();
        }
        catch (err) {
            console.log(err);
            res.status(500).send({ message: err.message });
        }
    },

    async updateToilet(req, res) {
        try {
            await toiletService.updateToilet(req.params.toiletId, req.body.toiletItem, req.file);
            res.send();
        }
        catch (err) {
            console.log(err);
            res.status(500).send({ message: err.message });
        }
    },

    async getToiletsByQuery(req, res) {
        try {
            const results = await toiletService.getToiletsByQuery(req.query);
            res.send(results);
        }
        catch (err) {
            console.log(err);
            res.status(500).send({ message: err.message });
        }
    },

    async getOneToilet(req, res) {
        try {
            const result = await toiletService.getOneToilet(req.params.toiletId);
            res.send(result);
        }
        catch (err) {
            console.log(err);
            res.status(500).send({ message: err.message });
        }
    },

    async deleteToilet(req, res) {
        try {
            await toiletService.deleteToilet(req.params.toiletId);
            res.send({ message: 'deleted successfully' });
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: err.message });
        }
    },

    async deleteAll(req, res) {
        try {
            await toiletService.deleteAll();
            res.send({ message: 'deleted successfully' });
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: err.message });
        }
    }
}
