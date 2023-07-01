const mongoose = require('mongoose');

const TodoLists = mongoose.model("TodoLists", new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    name: { type: String, default: "" },
    desc: { type: String, default: "" },
    is_done: { type: Boolean, default: false },
    start_date: { type: Date, default: Date.now },
    end_date: { type: Date, default: Date.now },
    current_date: { type: Date, default: Date.now }

}));

module.exports = TodoLists;