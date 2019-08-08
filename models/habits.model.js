const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const habitSchema = new Schema({
    user: { type: String, required: true },
    habitName: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: Number },
    durUnits: { type: String },
    sets: { type: Number },
    reps: { type: Number },
    notes: { type: String },
    weight: { type: Number},
    date: { type: Date, required: true }
}, {
    timestamps: true
});

const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;