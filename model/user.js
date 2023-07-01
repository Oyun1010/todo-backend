const mongoose = require('mongoose');

const Users = mongoose.model("users", new mongoose.Schema({
    name: { type: String, default: "" },
    user_name: { type: String, default: "" },
    email: { type: String, default: "" },
    profile_pic: { type: String, default: "" },
    todo: { type: mongoose.Schema.Types.ObjectId, ref: 'todo' }
}));

module.exports = Users;