require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.info("Connected to the Database");
})
    .catch((e) => {
        console.log("Error: ", e);
    });

module.exports = mongoose;