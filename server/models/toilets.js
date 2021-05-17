class Toilet {
    constructor(_id, name, price, location, text, unisex, numCells, babyChangingStations) {
        this._id = _id; // string (uuid)
        this.name = name; // string
        this.price = price; // number
        this.location = location; // string
        this.text = text; // string
        this.unisex = unisex; // string
        this.numCells = numCells; // number
        this.babyChangingStations = babyChangingStations; // string
    }
}

module.exports = { Toilet };

