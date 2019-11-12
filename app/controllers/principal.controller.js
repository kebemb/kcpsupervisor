const _Principale = require('../models/principal.model.js');

// Create and Save a new principal
exports.create = (req, res) => {
    // Validate request
    if(!req.body.firstName||!req.body.lastName||!req.body.gender||!req.body.userId) {
        console.log("infos principal incompletes")
        return res.status(400).send({
            message: "principal ne peut etre nul"
        });
    }

    // Create a principal
    const principal_ = new _Principale({
        firstName: req.body.firstName,
        lastName: req.body.lastName, 
        gender: req.body.gender,
        userId: req.body.userId, 
        image: req.body.image,

    });

    // Save principal in the database
    principal_.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors du ajout de l principal."
        });
    });
};

// Retrieve and return all principals from the database.
exports.findAll = (req, res) => {
    _Principale.find()
    .then(principals => {
        res.send(principals);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors du chargement de la liste de principals."
        });
    });
};

// Find a single principal with a principalId
exports.findOne = (req, res) => {
    _Principale.findById(req.params.principalId)
    .then(principal => {
        if(!principal) {
            return res.status(404).send({
                message: "Aucun principal a cette identifiant " + req.params.principalId
            });            
        }
        res.send(principal);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun principal a cette identifiant" + req.params.principalId
            });                
        }
        return res.status(500).send({
            message: "Aucun principal a cette identifiant " + req.params.principalId
        });
    });
};

// Update a principal identified by the principalId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.firstName||!req.body.lastName||!req.body.gender||!req.body.userId) {
        console.log("infos principal incompletes")
        return res.status(400).send({
            message: "principal ne peut etre nul"
        });
    }

    // Find principal and update it with the request body
    _Principale.findByIdAndUpdate(req.params.principalId, {
        firstName: req.body.firstName,
        lastName: req.body.lastName, 
        gender: req.body.gender,
        userId: req.body.userId, 
        image: req.body.image,
    }, {new: true})
    .then(principal => {
        if(!principal) {
            return res.status(404).send({
                message: "Aucun principal a cette identifiant " + req.params.principalId
            });
        }
        res.send(principal);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun principal a cette identifiant " + req.params.principalId
            });                
        }
        return res.status(500).send({
            message: "Error updating principal with id " + req.params.principalId
        });
    });
};

// Delete a principal with the specified principalId in the request
exports.delete = (req, res) => {
    _Principale.findByIdAndRemove(req.params.principalId)
    .then(principal => {
        if(!principal) {
            return res.status(404).send({
                message: "Aucun principal a cette identifiant " + req.params.principalId
            });
        }
        res.send({message: "principal supprime avec succes!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Aucun principal a cette identifiant " + req.params.principalId
            });                
        }
        return res.status(500).send({
            message: "Impossible de supprimer un principal avec cet indentifiant " + req.params.principalId
        });
    });
};