const _Classroom = require('../models/classroom.model.js');

// Create and Save a new classroom
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name||!req.body.serie||!req.body.level) {
        console.log("infos classroom incompletes")
        return res.status(400).send({
            message: "classroom ne peut etre nul"
        });
    }

    // Create a classroom
    const classroom_ = new _Classroom({
        name: req.body.name,
        serie: req.body.serie, 
        level: req.body.level,

    });

    // Save classroom in the database
    classroom_.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors du ajout de l classroom."
        });
    });
};

// Retrieve and return all classrooms from the database.
exports.findAll = (req, res) => {
    _Classroom.find()
    .then(classroom => {
        res.send(classroom);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors du chargement de la liste de classrooms."
        });
    });
};

// Find a single classroom with a classroomId
exports.findOne = (req, res) => {
    _Classroom.findById(req.params.classroomId)
    .then(classroom => {
        if(!classroom) {
            return res.status(404).send({
                message: "Aucun classroom a cette identifiant " + req.params.classroomId
            });            
        }
        res.send(classroom);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun classroom a cette identifiant" + req.params.classroomId
            });                
        }
        return res.status(500).send({
            message: "Aucun classroom a cette identifiant " + req.params.classroomId
        });
    });
};

// Update a classroom identified by the classroomId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name||!req.body.serie||!req.body.level) {
        console.log("infos classroom incompletes")
        return res.status(400).send({
            message: "classroom ne peut etre nul"
        });
    }

    // Find classroom and update it with the request body
    _Classroom.findByIdAndUpdate(req.params.classroomId, {
        serie: req.body.serie || "Untitled classroom", 
        name: req.body.name,
        level: req.body.level,
    }, {new: true})
    .then(classroom => {
        if(!classroom) {
            return res.status(404).send({
                message: "Aucun classroom a cette identifiant " + req.params.classroomId
            });
        }
        res.send(classroom);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun classroom a cette identifiant " + req.params.classroomId
            });                
        }
        return res.status(500).send({
            message: "Error updating classroom with id " + req.params.classroomId
        });
    });
};

// Delete a classroom with the specified classroomId in the request
exports.delete = (req, res) => {
    _Classroom.findByIdAndRemove(req.params.classroomId)
    .then(classroom => {
        if(!classroom) {
            return res.status(404).send({
                message: "Aucun classroom a cette identifiant " + req.params.classroomId
            });
        }
        res.send({message: "classroom supprime avec succes!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Aucun classroom a cette identifiant " + req.params.classroomId
            });                
        }
        return res.status(500).send({
            message: "Impossible de supprimer un classroom avec cet indentifiant " + req.params.classroomId
        });
    });
};