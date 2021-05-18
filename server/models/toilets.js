class Toilet {
    constructor(_id, name, price, city, country, lat, lng, file, text, unisex, numCells, babyChangingStations) {
        this._id = _id; // string (uuid)
        this.name = name; // string
        this.price = price; // number
        this.city = city; // string
        this.country = country; // string
        this.lat = lat; // number
        this.lng = lng; // number
        this.file = file; // string
        this.text = text; // string
        this.unisex = unisex; // string
        this.numCells = numCells; // number
        this.babyChangingStations = babyChangingStations; // string
    }
}

module.exports = { Toilet };

