const _Student = require('../models/student.model.js');

// Create and Save a new student
exports.create = (req, res) => {
    // Validate request
    if(!req.body.lastName||!req.body.firstName||!req.body.gender||!req.body.image||!req.body.birthDate||!req.body.birthAddress||!req.body.address) {
        console.log("infos student incompletes")
        return res.status(400).send({
            message: "student ne peut etre nul"
        });
    }

    // Create a student
    const student_ = new _Student({
        firstName: req.body.firstName || "Untitled student", 
        lastName: req.body.lastName,
        gender: req.body.gender,
        birthAddress: req.body.birthAddress,
        birthDate: req.body.birthDate,
        image: req.body.image,
        address: req.body.address,

    });

    // Save student in the database
    student_.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors du ajout de l student."
        });
    });
};

// Retrieve and return all students from the database.
exports.findAll = (req, res) => {
    _Student.find()
    .then(students => {
        res.send(students);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors du chargement de la liste de students."
        });
    });
};

// Find a single student with a studentId
exports.findOne = (req, res) => {
    _Student.findById(req.params.studentId)
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "Aucun student a cette identifiant " + req.params.studentId
            });            
        }
        res.send(student);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun student a cette identifiant" + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Aucun student a cette identifiant " + req.params.studentId
        });
    });
};

// Update a student identified by the studentId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.lastName||!req.body.firstName||!req.body.gender||!req.body.image||!req.body.birthDate||!req.body.birthAddress||!req.body.address) {
        console.log("infos student incompletes")
        return res.status(400).send({
            message: "student ne peut etre nul"
        });
    }

    // Find student and update it with the request body
    _Student.findByIdAndUpdate(req.params.studentId, {
        firstName: req.body.firstName || "Untitled student", 
        lastName: req.body.lastName,
        gender: req.body.gender,
        birthAddress: req.body.birthAddress,
        birthDate: req.body.birthDate,
        image: req.body.image,
        address: req.body.address,
    }, {new: true})
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "Aucun student a cette identifiant " + req.params.studentId
            });
        }
        res.send(student);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun student a cette identifiant " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Error updating student with id " + req.params.studentId
        });
    });
};

// Delete a student with the specified studentId in the request
exports.delete = (req, res) => {
    _Student.findByIdAndRemove(req.params.studentId)
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "Aucun student a cette identifiant " + req.params.studentId
            });
        }
        res.send({message: "student supprime avec succes!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Aucun student a cette identifiant " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Impossible de supprimer un eleve avec cet indentifiant " + req.params.studentId
        });
    });
};