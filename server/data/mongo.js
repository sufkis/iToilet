const MongoClient = require('mongodb').MongoClient;

const dbConnected = MongoClient.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
                               .catch( err => { console.log(err);  });

module.exports = {

    async getManyByQuery(databaseName, collectionName, query)
    {
        const client = await dbConnected;
        const res = await client.db(databaseName).collection(collectionName).find(query).toArray();   
        return res;
    },
    
    async getOneByQuery(databaseName, collectionName, query)
    {
        const client = await dbConnected;
        const res = await client.db(databaseName).collection(collectionName).findOne(query);
        return res;
    },
    
    async insertOne(databaseName, collectionName, data)
    {
        const client = await dbConnected;
        const res = await client.db(databaseName).collection(collectionName).insertOne(data);
        return res;
    },
    
    async findOneAndReplace(databaseName, collectionName, query, data)
    {
        const client = await dbConnected;
        const res = await client.db(databaseName).collection(collectionName).findOneAndReplace(query, data);
        return res;
    },
    
    async deleteOne(databaseName, collectionName, query)
    {
        const client = await dbConnected;
        const res = await client.db(databaseName).collection(collectionName).deleteOne(query);
        return res;
    },
    
    async deleteAll(databaseName, collectionName)
    {
        const client = await dbConnected;
        const res = await client.db(databaseName).collection(collectionName).deleteMany();
        return res;
    },

    async updateOne(databaseName, collectionName, findQuery, updateQuery)
    {
        const client = await dbConnected;
        const res = await client.db(databaseName).collection(collectionName).updateOne(findQuery, updateQuery);
        return res;
    }

};