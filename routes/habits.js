const router = require('express').Router();
let Habit = require('../models/habits.model');

// rootURL/habits/
// get list of all habits, returned in json format
router.route('/').get((req, res) => {
    Habit.find()
        .then(habits => res.json(habits))
        .catch(err => res.status(400).json('Error: ' + err));
});

// rootURL/habits/add
// create a new instance of a habit
// save new habit to DB
router.route('/add').post((req, res) => {
    const user = req.body.user;
    const habitName = req.body.habitName;
    const type = req.body.type;
    const duration = Number(req.body.duration);
    const durUnits = req.body.durUnits;
    const notes = req.body.notes;
    const weight = Number(req.body.weight);
    const date = req.body.date;

    const newHabit = new Habit({
        user,
        habitName,
        type,
        duration,
        durUnits,
        notes,
        weight,
        date
    });

    newHabit.save()
        .then(() => res.json('Habit added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// rootURL/habits/:id
// return specific habit
router.route('/:id').get((req, res) => {
    Habit.findById(req.params.id)
        .then(habit => res.json(habit))
        .catch(err => res.status(400).json('Error: ' + err));
});

// rootURL/habits/:id
// delete specific habit
router.route('/:id').delete((req, res) => {
    Habit.findByIdAndDelete(req.params.id)
        .then(() => res.json('Habit deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// rootURL/habits/update/:id
// update specific habit
router.route('/update/:id').post((req, res) => {
    Habit.findById(req.params.id)
        .then(habit => {
            habit.username = req.body.username;
            habit.habitName = req.body.habitName;
            habit.type = req.body.type;
            habit.duration = req.body.duration;
            habit.durUnits = req.body.durUnits;
            habit.notes = req.body.notes;
            habit.weight = req.body.weight;
            habit.date = req.body.date;

            habit.save()
                .then(() => res.json('Habit updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;