const mongoose = require("mongoose")
const {log} = require("mercedlogger")
const DATABASE_URL="mongodb+srv://s3978826:Duybaodao28102005@main.spfw0.mongodb.net/";

// CONNECT TO MONGO
mongoose.connect(DATABASE_URL);

// CONNECTION EVENTS
mongoose.connection
.on("open", () => log.green("DATABASE STATE", "Connection Open"))
.on("close", () => log.magenta("DATABASE STATE", "Connection Open"))
.on("error", (error) => log.red("DATABASE STATE", error))

// EXPORT CONNECTION
module.exports = mongoose;