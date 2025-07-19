require('dotenv').config();

const constructMongoUri = () => {
    const username = process.env.MONGO_USERNAME;
    const password = process.env.MONGO_PASSWORD;
    const domain = process.env.MONGO_DOMAIN;
    const dbName = process.env.MONGO_DBNAME;
    
    if (!username || !password || !domain || !dbName) {
        throw new Error('Missing environment variables for MongoDB connection');
    }
    
    return `mongodb+srv://${username}:${password}@${domain}/${dbName}?retryWrites=true&w=majority`;
}

module.exports = {
    constructMongoUri
}
