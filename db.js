const { MongoClient } = require('mongodb');

// Connection URL and database name
const url = 'mongodb://localhost:27017';
const dbName = 'Users';

async function connect() {
  const client = new MongoClient(url, { useUnifiedTopology: true });
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log('Connected successfully to MongoDB');
    
    const db = client.db(dbName);
    // You can now perform database operations using `db`
    
    return db;
  } catch (err) {
    console.error(err);
  }
}

module.exports = { connect };
