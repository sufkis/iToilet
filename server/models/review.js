class Review {
    constructor(_id, rate, text, userId, toiletId) {
        this._id = _id; // string (uuid)
        this.rate = rate; // number
        this.text = text; // string
        this.userId = userId; // string (uuid)
        this.toiletId = toiletId; // string (uuid)
    }
}

module.exports = { Review };