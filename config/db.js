const mongoose = require('mongoose');
const config = require('./keys');
const db = config.mongoURI;

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true
        });

        console.log('Mongoose connected');
    }
    catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;