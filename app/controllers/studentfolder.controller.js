const _Studentfolder = require('../models/studentfolder.model.js');

// Create and Save a new studentfolder
exports.create = (req, res) => {
    // Validate request
    if(!req.body.studentId||!req.body.notes) {
        console.log("infos studentfolder incompletes")
        return res.status(400).send({
            message: "studentfolder ne peut etre nul"
        });
    }

    // Create a studentfolder
    const studentfolder_ = new _Studentfolder({
        studentId: req.body.studentId,
        notes: req.body.notes, 
        

    });

    // Save studentfolder in the database
    studentfolder_.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors du ajout de l studentfolder."
        });
    });
};

// Retrieve and return all studentfolders from the database.
exports.findAll = (req, res) => {
    _Studentfolder.find()
    .then(studentfolders => {
        res.send(studentfolders);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors du chargement de la liste de studentfolders."
        });
    });
};

// Find a single studentfolder with a studentfolderId
exports.findOne = (req, res) => {
    _Studentfolder.findById(req.params.studentfolderId)
    .then(studentfolder => {
        if(!studentfolder) {
            return res.status(404).send({
                message: "Aucun studentfolder a cette identifiant " + req.params.studentfolderId
            });            
        }
        res.send(studentfolder);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun studentfolder a cette identifiant" + req.params.studentfolderId
            });                
        }
        return res.status(500).send({
            message: "Aucun studentfolder a cette identifiant " + req.params.studentfolderId
        });
    });
};

// Update a studentfolder identified by the studentfolderId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.studentId||!req.body.notes) {
        console.log("infos studentfolder incompletes")
        return res.status(400).send({
            message: "studentfolder ne peut etre nul"
        });
    }

    // Find studentfolder and update it with the request body
    _Studentfolder.findByIdAndUpdate(req.params.studentfolderId, {
        notes: req.body.notes || "Untitled studentfolder", 
        studentId: req.body.studentId,
        
    }, {new: true})
    .then(studentfolder => {
        if(!studentfolder) {
            return res.status(404).send({
                message: "Aucun studentfolder a cette identifiant " + req.params.studentfolderId
            });
        }
        res.send(studentfolder);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun studentfolder a cette identifiant " + req.params.studentfolderId
            });                
        }
        return res.status(500).send({
            message: "Error updating studentfolder with id " + req.params.studentfolderId
        });
    });
};

// Delete a studentfolder with the specified studentfolderId in the request
exports.delete = (req, res) => {
    _Studentfolder.findByIdAndRemove(req.params.studentfolderId)
    .then(studentfolder => {
        if(!studentfolder) {
            return res.status(404).send({
                message: "Aucun studentfolder a cette identifiant " + req.params.studentfolderId
            });
        }
        res.send({message: "studentfolder supprime avec succes!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Aucun studentfolder a cette identifiant " + req.params.studentfolderId
            });                
        }
        return res.status(500).send({
            message: "Impossible de supprimer un studentfolder avec cet indentifiant " + req.params.studentfolderId
        });
    });
};