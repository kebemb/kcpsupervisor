const _Classstudent = require('../models/classstudent.model.js');

// Create and Save a new classstudent
exports.create = (req, res) => {
    // Validate request
    if(!req.body.classRoomId||!req.body.studentId) {
        console.log("infos classstudent incompletes")
        return res.status(400).send({
            message: "classstudent ne peut etre nul"
        });
    }

    // Create a classstudent
    const classstudent_ = new _Classstudent({
        classRoomId: req.body.classRoomId,
        studentId: req.body.studentId

    });

    // Save classstudent in the database
    classstudent_.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors du ajout de l classstudent."
        });
    });
};

// Retrieve and return all classstudents from the database.
exports.findAll = (req, res) => {
    _Classstudent.find()
    .then(classstudents => {
        res.send(classstudents);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors du chargement de la liste de classstudents."
        });
    });
};

// Find a single classstudent with a classstudentId
exports.findOne = (req, res) => {
    _Classstudent.findById(req.params.classstudentId)
    .then(classstudent => {
        if(!classstudent) {
            return res.status(404).send({
                message: "Aucun classstudent a cette identifiant " + req.params.classstudentId
            });            
        }
        res.send(classstudent);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun classstudent a cette identifiant" + req.params.classstudentId
            });                
        }
        return res.status(500).send({
            message: "Aucun classstudent a cette identifiant " + req.params.classstudentId
        });
    });
};

// Update a classstudent identified by the classstudentId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.classRoomId||!req.body.studentId) {
        console.log("infos classstudent incompletes")
        return res.status(400).send({
            message: "classstudent ne peut etre nul"
        });
    }

    // Find classstudent and update it with the request body
    _Classstudent.findByIdAndUpdate(req.params.classstudentId, {
        classRoomId: req.body.classRoomId,
        studentId: req.body.studentId
    }, {new: true})
    .then(classstudent => {
        if(!classstudent) {
            return res.status(404).send({
                message: "Aucun classstudent a cette identifiant " + req.params.classstudentId
            });
        }
        res.send(classstudent);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun classstudent a cette identifiant " + req.params.classstudentId
            });                
        }
        return res.status(500).send({
            message: "Error updating classstudent with id " + req.params.classstudentId
        });
    });
};

// Delete a classstudent with the specified classstudentId in the request
exports.delete = (req, res) => {
    _Classstudent.findByIdAndRemove(req.params.classstudentId)
    .then(classstudent => {
        if(!classstudent) {
            return res.status(404).send({
                message: "Aucun classstudent a cette identifiant " + req.params.classstudentId
            });
        }
        res.send({message: "classstudent supprime avec succes!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Aucun classstudent a cette identifiant " + req.params.classstudentId
            });                
        }
        return res.status(500).send({
            message: "Impossible de supprimer un classstudent avec cet indentifiant " + req.params.classstudentId
        });
    });
};