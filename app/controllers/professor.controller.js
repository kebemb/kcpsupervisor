const _Professor = require('../models/professor.model.js');

// Create and Save a new professor
exports.create = (req, res) => {
    // Validate request
    if(!req.body.firstName||!req.body.lastName||!req.body.gender||!req.body.speciality||!req.body.userId) {
        console.log("infos professor incompletes")
        return res.status(400).send({
            message: "professor ne peut etre nul"
        });
    }

    // Create a professor
    const professor_ = new _Professor({
        firstName: req.body.firstName,
        lastName: req.body.lastName, 
        gender: req.body.gender,
        speciality: req.body.speciality,
        userId: req.body.userId, 
        image: req.body.image,

    });

    // Save professor in the database
    professor_.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors du ajout de l professor."
        });
    });
};

// Retrieve and return all professors from the database.
exports.findAll = (req, res) => {
    _Professor.find()
    .then(professors => {
        res.send(professors);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors du chargement de la liste de professors."
        });
    });
};

// Find a single professor with a professorId
exports.findOne = (req, res) => {
    _Professor.findById(req.params.professorId)
    .then(professor => {
        if(!professor) {
            return res.status(404).send({
                message: "Aucun professor a cette identifiant " + req.params.professorId
            });            
        }
        res.send(professor);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun professor a cette identifiant" + req.params.professorId
            });                
        }
        return res.status(500).send({
            message: "Aucun professor a cette identifiant " + req.params.professorId
        });
    });
};

// Update a professor identified by the professorId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.firstName||!req.body.lastName||!req.body.gender||!req.body.speciality||!req.body.userId) {
        console.log("infos professor incompletes")
        return res.status(400).send({
            message: "professor ne peut etre nul"
        });
    }

    // Find professor and update it with the request body
    _Professor.findByIdAndUpdate(req.params.professorId, {
        firstName: req.body.firstName,
        lastName: req.body.lastName, 
        gender: req.body.gender,
        speciality: req.body.speciality,
        userId: req.body.userId, 
        image: req.body.image,
    }, {new: true})
    .then(professor => {
        if(!professor) {
            return res.status(404).send({
                message: "Aucun professor a cette identifiant " + req.params.professorId
            });
        }
        res.send(professor);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun professor a cette identifiant " + req.params.professorId
            });                
        }
        return res.status(500).send({
            message: "Error updating professor with id " + req.params.professorId
        });
    });
};

// Delete a professor with the specified professorId in the request
exports.delete = (req, res) => {
    _Professor.findByIdAndRemove(req.params.professorId)
    .then(professor => {
        if(!professor) {
            return res.status(404).send({
                message: "Aucun professor a cette identifiant " + req.params.professorId
            });
        }
        res.send({message: "professor supprime avec succes!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Aucun professor a cette identifiant " + req.params.professorId
            });                
        }
        return res.status(500).send({
            message: "Impossible de supprimer un professor avec cet indentifiant " + req.params.professorId
        });
    });
};