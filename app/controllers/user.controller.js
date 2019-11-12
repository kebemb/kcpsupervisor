const _User = require('../models/user.model.js');

// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if(!req.body.login||!req.body.password||!req.body.profil) {
        console.log("infos user incompletes")
        return res.status(400).send({
            message: "user ne peut etre nul"
        });
    }

    // Create a user
    const user_ = new _User({
        login: req.body.login,
        password: req.body.password, 
        profil: req.body.profil,

    });

    // Save user in the database
    user_.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors du ajout de l user."
        });
    });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    _User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors du chargement de la liste de users."
        });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    _User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "Aucun user a cette identifiant " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun user a cette identifiant" + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Aucun user a cette identifiant " + req.params.userId
        });
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.login||!req.body.password||!req.body.profil) {
        console.log("infos user incompletes")
        return res.status(400).send({
            message: "user ne peut etre nul"
        });
    }

    // Find user and update it with the request body
    _User.findByIdAndUpdate(req.params.userId, {
        password: req.body.password || "Untitled user", 
        login: req.body.login,
        profil: req.body.profil,
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "Aucun user a cette identifiant " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun user a cette identifiant " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userId
        });
    });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    _User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "Aucun user a cette identifiant " + req.params.userId
            });
        }
        res.send({message: "user supprime avec succes!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Aucun user a cette identifiant " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Impossible de supprimer un user avec cet indentifiant " + req.params.userId
        });
    });
};