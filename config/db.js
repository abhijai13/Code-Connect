const mongoose = require("mongoose")
const config = require("config")

const dbURI = config.get("mongoURI")

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI)

        console.log(`MongoDB Connected...`)
    } catch (err) {
        console.error(err.message)

        process.exit(1)
    }
}

// connectDB();

module.exports = connectDB;
