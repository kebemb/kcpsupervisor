const _Roomclassroom = require('../models/roomclassroom.model.js');

// Create and Save a new roomclassroom
exports.create = (req, res) => {
    // Validate request
    if(!req.body.classRoomId||!req.body.roomId) {
        console.log("infos roomclassroom incompletes")
        return res.status(400).send({
            message: "roomclassroom ne peut etre nul"
        });
    }

    // Create a roomclassroom
    const roomclassroom_ = new _Roomclassroom({
        classRoomId: req.body.classRoomId,
        roomId: req.body.roomId

    });

    // Save roomclassroom in the database
    roomclassroom_.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors du ajout de l roomclassroom."
        });
    });
};

// Retrieve and return all roomclassrooms from the database.
exports.findAll = (req, res) => {
    _Roomclassroom.find()
    .then(roomclassrooms => {
        res.send(roomclassrooms);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors du chargement de la liste de roomclassrooms."
        });
    });
};

// Find a single roomclassroom with a roomclassroomId
exports.findOne = (req, res) => {
    _Roomclassroom.findById(req.params.roomclassroomId)
    .then(roomclassroom => {
        if(!roomclassroom) {
            return res.status(404).send({
                message: "Aucun roomclassroom a cette identifiant " + req.params.roomclassroomId
            });            
        }
        res.send(roomclassroom);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun roomclassroom a cette identifiant" + req.params.roomclassroomId
            });                
        }
        return res.status(500).send({
            message: "Aucun roomclassroom a cette identifiant " + req.params.roomclassroomId
        });
    });
};

// Update a roomclassroom identified by the roomclassroomId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.classRoomId||!req.body.roomId) {
        console.log("infos roomclassroom incompletes")
        return res.status(400).send({
            message: "roomclassroom ne peut etre nul"
        });
    }

    // Find roomclassroom and update it with the request body
    _Roomclassroom.findByIdAndUpdate(req.params.roomclassroomId, {
        classRoomId: req.body.classRoomId,
        roomId: req.body.roomId
    }, {new: true})
    .then(roomclassroom => {
        if(!roomclassroom) {
            return res.status(404).send({
                message: "Aucun roomclassroom a cette identifiant " + req.params.roomclassroomId
            });
        }
        res.send(roomclassroom);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun roomclassroom a cette identifiant " + req.params.roomclassroomId
            });                
        }
        return res.status(500).send({
            message: "Error updating roomclassroom with id " + req.params.roomclassroomId
        });
    });
};

// Delete a roomclassroom with the specified roomclassroomId in the request
exports.delete = (req, res) => {
    _Roomclassroom.findByIdAndRemove(req.params.roomclassroomId)
    .then(roomclassroom => {
        if(!roomclassroom) {
            return res.status(404).send({
                message: "Aucun roomclassroom a cette identifiant " + req.params.roomclassroomId
            });
        }
        res.send({message: "roomclassroom supprime avec succes!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Aucun roomclassroom a cette identifiant " + req.params.roomclassroomId
            });                
        }
        return res.status(500).send({
            message: "Impossible de supprimer un roomclassroom avec cet indentifiant " + req.params.roomclassroomId
        });
    });
};