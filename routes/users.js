const router = require('express').Router();
let User = require('../models/users.model');

// rootURL/users/
// get list of all users, returned in json format
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// rootURL/users/add
// create a new instance of the user
// save new user to DB
router.route('/add').post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const photo = req.body.photo;

    const newUser = new User({
        name,
        email,
        photo
    });

    newUser.save()
        .then(users => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;