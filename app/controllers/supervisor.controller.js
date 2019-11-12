const _Supervisor = require('../models/supervisor.model.js');

// Create and Save a new supervisor
exports.create = (req, res) => {
    // Validate request
    if(!req.body.firstName||!req.body.lastName||!req.body.gender||!req.body.userId) {
        console.log("infos supervisor incompletes")
        return res.status(400).send({
            message: "supervisor ne peut etre nul"
        });
    }

    // Create a supervisor
    const supervisor_ = new _Supervisor({
        firstName: req.body.firstName,
        lastName: req.body.lastName, 
        gender: req.body.gender,
        userId: req.body.userId, 
        image: req.body.image,

    });

    // Save supervisor in the database
    supervisor_.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors du ajout de l supervisor."
        });
    });
};

// Retrieve and return all supervisors from the database.
exports.findAll = (req, res) => {
    _Supervisor.find()
    .then(supervisors => {
        res.send(supervisors);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors du chargement de la liste de supervisors."
        });
    });
};

// Find a single supervisor with a supervisorId
exports.findOne = (req, res) => {
    _Supervisor.findById(req.params.supervisorId)
    .then(supervisor => {
        if(!supervisor) {
            return res.status(404).send({
                message: "Aucun supervisor a cette identifiant " + req.params.supervisorId
            });            
        }
        res.send(supervisor);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun supervisor a cette identifiant" + req.params.supervisorId
            });                
        }
        return res.status(500).send({
            message: "Aucun supervisor a cette identifiant " + req.params.supervisorId
        });
    });
};

// Update a supervisor identified by the supervisorId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.firstName||!req.body.lastName||!req.body.gender||!req.body.userId) {
        console.log("infos supervisor incompletes")
        return res.status(400).send({
            message: "supervisor ne peut etre nul"
        });
    }

    // Find supervisor and update it with the request body
    _Supervisor.findByIdAndUpdate(req.params.supervisorId, {
        firstName: req.body.firstName,
        lastName: req.body.lastName, 
        gender: req.body.gender,
        userId: req.body.userId, 
        image: req.body.image,
    }, {new: true})
    .then(supervisor => {
        if(!supervisor) {
            return res.status(404).send({
                message: "Aucun supervisor a cette identifiant " + req.params.supervisorId
            });
        }
        res.send(supervisor);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun supervisor a cette identifiant " + req.params.supervisorId
            });                
        }
        return res.status(500).send({
            message: "Error updating supervisor with id " + req.params.supervisorId
        });
    });
};

// Delete a supervisor with the specified supervisorId in the request
exports.delete = (req, res) => {
    _Supervisor.findByIdAndRemove(req.params.supervisorId)
    .then(supervisor => {
        if(!supervisor) {
            return res.status(404).send({
                message: "Aucun supervisor a cette identifiant " + req.params.supervisorId
            });
        }
        res.send({message: "supervisor supprime avec succes!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Aucun supervisor a cette identifiant " + req.params.supervisorId
            });                
        }
        return res.status(500).send({
            message: "Impossible de supprimer un supervisor avec cet indentifiant " + req.params.supervisorId
        });
    });
};