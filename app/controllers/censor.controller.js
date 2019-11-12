const _Censor = require('../models/censor.model.js');

// Create and Save a new censor
exports.create = (req, res) => {
    // Validate request
    if(!req.body.firstName||!req.body.lastName||!req.body.gender||!req.body.userId) {
        console.log("infos censor incompletes")
        return res.status(400).send({
            message: "censor ne peut etre nul"
        });
    }

    // Create a censor
    const censor_ = new _Censor({
        firstName: req.body.firstName,
        lastName: req.body.lastName, 
        gender: req.body.gender,
        userId: req.body.userId, 
        image: req.body.image,

    });

    // Save censor in the database
    censor_.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors du ajout de l censor."
        });
    });
};

// Retrieve and return all censors from the database.
exports.findAll = (req, res) => {
    _Censor.find()
    .then(censors => {
        res.send(censors);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors du chargement de la liste de censors."
        });
    });
};

// Find a single censor with a censorId
exports.findOne = (req, res) => {
    _Censor.findById(req.params.censorId)
    .then(censor => {
        if(!censor) {
            return res.status(404).send({
                message: "Aucun censor a cette identifiant " + req.params.censorId
            });            
        }
        res.send(censor);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun censor a cette identifiant" + req.params.censorId
            });                
        }
        return res.status(500).send({
            message: "Aucun censor a cette identifiant " + req.params.censorId
        });
    });
};

// Update a censor identified by the censorId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.firstName||!req.body.lastName||!req.body.gender||!req.body.userId) {
        console.log("infos censor incompletes")
        return res.status(400).send({
            message: "censor ne peut etre nul"
        });
    }

    // Find censor and update it with the request body
    _Censor.findByIdAndUpdate(req.params.censorId, {
        firstName: req.body.firstName,
        lastName: req.body.lastName, 
        gender: req.body.gender,
        userId: req.body.userId, 
        image: req.body.image,
    }, {new: true})
    .then(censor => {
        if(!censor) {
            return res.status(404).send({
                message: "Aucun censor a cette identifiant " + req.params.censorId
            });
        }
        res.send(censor);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun censor a cette identifiant " + req.params.censorId
            });                
        }
        return res.status(500).send({
            message: "Error updating censor with id " + req.params.censorId
        });
    });
};

// Delete a censor with the specified censorId in the request
exports.delete = (req, res) => {
    _Censor.findByIdAndRemove(req.params.censorId)
    .then(censor => {
        if(!censor) {
            return res.status(404).send({
                message: "Aucun censor a cette identifiant " + req.params.censorId
            });
        }
        res.send({message: "censor supprime avec succes!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Aucun censor a cette identifiant " + req.params.censorId
            });                
        }
        return res.status(500).send({
            message: "Impossible de supprimer un censor avec cet indentifiant " + req.params.censorId
        });
    });
};