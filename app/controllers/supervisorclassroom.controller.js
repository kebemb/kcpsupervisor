const _Supervisorclassroom = require('../models/supervisorclassroom.model.js');

// Create and Save a new supervisorclassroom
exports.create = (req, res) => {
    // Validate request
    if(!req.body.classRoomId||!req.body.supervisorId) {
        console.log("infos supervisorclassroom incompletes")
        return res.status(400).send({
            message: "supervisorclassroom ne peut etre nul"
        });
    }

    // Create a supervisorclassroom
    const supervisorclassroom_ = new _Supervisorclassroom({
        classRoomId: req.body.classRoomId,
        supervisorId: req.body.supervisorId

    });

    // Save supervisorclassroom in the database
    supervisorclassroom_.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors du ajout de l supervisorclassroom."
        });
    });
};

// Retrieve and return all supervisorclassrooms from the database.
exports.findAll = (req, res) => {
    _Supervisorclassroom.find()
    .then(supervisorclassrooms => {
        res.send(supervisorclassrooms);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors du chargement de la liste de supervisorclassrooms."
        });
    });
};

// Find a single supervisorclassroom with a supervisorclassroomId
exports.findOne = (req, res) => {
    _Supervisorclassroom.findById(req.params.supervisorclassroomId)
    .then(supervisorclassroom => {
        if(!supervisorclassroom) {
            return res.status(404).send({
                message: "Aucun supervisorclassroom a cette identifiant " + req.params.supervisorclassroomId
            });            
        }
        res.send(supervisorclassroom);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun supervisorclassroom a cette identifiant" + req.params.supervisorclassroomId
            });                
        }
        return res.status(500).send({
            message: "Aucun supervisorclassroom a cette identifiant " + req.params.supervisorclassroomId
        });
    });
};

// Update a supervisorclassroom identified by the supervisorclassroomId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.classRoomId||!req.body.supervisorId) {
        console.log("infos supervisorclassroom incompletes")
        return res.status(400).send({
            message: "supervisorclassroom ne peut etre nul"
        });
    }

    // Find supervisorclassroom and update it with the request body
    _Supervisorclassroom.findByIdAndUpdate(req.params.supervisorclassroomId, {
        classRoomId: req.body.classRoomId,
        supervisorId: req.body.supervisorId
    }, {new: true})
    .then(supervisorclassroom => {
        if(!supervisorclassroom) {
            return res.status(404).send({
                message: "Aucun supervisorclassroom a cette identifiant " + req.params.supervisorclassroomId
            });
        }
        res.send(supervisorclassroom);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun supervisorclassroom a cette identifiant " + req.params.supervisorclassroomId
            });                
        }
        return res.status(500).send({
            message: "Error updating supervisorclassroom with id " + req.params.supervisorclassroomId
        });
    });
};

// Delete a supervisorclassroom with the specified supervisorclassroomId in the request
exports.delete = (req, res) => {
    _Supervisorclassroom.findByIdAndRemove(req.params.supervisorclassroomId)
    .then(supervisorclassroom => {
        if(!supervisorclassroom) {
            return res.status(404).send({
                message: "Aucun supervisorclassroom a cette identifiant " + req.params.supervisorclassroomId
            });
        }
        res.send({message: "supervisorclassroom supprime avec succes!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Aucun supervisorclassroom a cette identifiant " + req.params.supervisorclassroomId
            });                
        }
        return res.status(500).send({
            message: "Impossible de supprimer un supervisorclassroom avec cet indentifiant " + req.params.supervisorclassroomId
        });
    });
};