const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const habitSchema = new Schema({
    username: { type: String, required: true },
    habitName: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    reps: { type: Number, required: true },
    notes: { type: String },
    date: { type: Date, required: true }
}, {
    timestamps: true
});

const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;