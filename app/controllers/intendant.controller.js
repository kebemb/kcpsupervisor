const _Intendant = require('../models/intendant.model.js');

// Create and Save a new intendant
exports.create = (req, res) => {
    // Validate request
    if(!req.body.firstName||!req.body.lastName||!req.body.gender||!req.body.userId) {
        console.log("infos intendant incompletes")
        return res.status(400).send({
            message: "intendant ne peut etre nul"
        });
    }

    // Create a intendant
    const intendant_ = new _Intendant({
        firstName: req.body.firstName,
        lastName: req.body.lastName, 
        gender: req.body.gender,
        userId: req.body.userId, 
        image: req.body.image,

    });

    // Save intendant in the database
    intendant_.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors du ajout de l intendant."
        });
    });
};

// Retrieve and return all intendants from the database.
exports.findAll = (req, res) => {
    _Intendant.find()
    .then(intendants => {
        res.send(intendants);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors du chargement de la liste de intendants."
        });
    });
};

// Find a single intendant with a intendantId
exports.findOne = (req, res) => {
    _Intendant.findById(req.params.intendantId)
    .then(intendant => {
        if(!intendant) {
            return res.status(404).send({
                message: "Aucun intendant a cette identifiant " + req.params.intendantId
            });            
        }
        res.send(intendant);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun intendant a cette identifiant" + req.params.intendantId
            });                
        }
        return res.status(500).send({
            message: "Aucun intendant a cette identifiant " + req.params.intendantId
        });
    });
};

// Update a intendant identified by the intendantId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.firstName||!req.body.lastName||!req.body.gender||!req.body.userId) {
        console.log("infos intendant incompletes")
        return res.status(400).send({
            message: "intendant ne peut etre nul"
        });
    }

    // Find intendant and update it with the request body
    _Intendant.findByIdAndUpdate(req.params.intendantId, {
        firstName: req.body.firstName,
        lastName: req.body.lastName, 
        gender: req.body.gender,
        userId: req.body.userId, 
        image: req.body.image,
    }, {new: true})
    .then(intendant => {
        if(!intendant) {
            return res.status(404).send({
                message: "Aucun intendant a cette identifiant " + req.params.intendantId
            });
        }
        res.send(intendant);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun intendant a cette identifiant " + req.params.intendantId
            });                
        }
        return res.status(500).send({
            message: "Error updating intendant with id " + req.params.intendantId
        });
    });
};

// Delete a intendant with the specified intendantId in the request
exports.delete = (req, res) => {
    _Intendant.findByIdAndRemove(req.params.intendantId)
    .then(intendant => {
        if(!intendant) {
            return res.status(404).send({
                message: "Aucun intendant a cette identifiant " + req.params.intendantId
            });
        }
        res.send({message: "intendant supprime avec succes!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Aucun intendant a cette identifiant " + req.params.intendantId
            });                
        }
        return res.status(500).send({
            message: "Impossible de supprimer un intendant avec cet indentifiant " + req.params.intendantId
        });
    });
};