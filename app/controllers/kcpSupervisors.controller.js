const _kcpSupervisor = require('../models/kcpSupervisors.model.js');
const fs = require('fs');

// Create and Save a new kcpSupervisor
exports.create = (req, res) => {
    // Validate request
    /*
    if(!req.body.dateNumeric||!req.body.filename||!req.body.pli_num||!req.body.pli_name) {
        console.log("infos du fichier incomplets")
        return res.status(400).send({
            message: "infos du fichier incompletes"
        });
    }
*/
filedata = getFiles('./directory/test.txt');
data= filedata.split(';')
    // Create a kcpSupervisor
    const kcpSupervisor_ = new _kcpSupervisor({
        filename: data[0],
        dateNumeric: data[1],
        pli_num: data[2],
        pli_name: data[3],
        state: data[4],
        file_path: data[5],
    });

    // Save kcpSupervisor in the database
    kcpSupervisor_.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors du ajout de l kcpSupervisor."
        });
    });
};

// Retrieve and return all kcpSupervisors from the database.
exports.findAll = (req, res) => {
    _kcpSupervisor.find()
    .then(kcpSupervisors => {
        res.send(kcpSupervisors);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors du chargement de la liste de kcpSupervisors."
        });
    });
};

// Find a single kcpSupervisor with a kcpSupervisorId
exports.findOne = (req, res) => {
    _kcpSupervisor.findById(req.params.kcpSupervisorId)
    .then(kcpSupervisor => {
        if(!kcpSupervisor) {
            return res.status(404).send({
                message: "Aucun kcpSupervisor a cette identifiant " + req.params.kcpSupervisorId
            });            
        }
        res.send(kcpSupervisor);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun kcpSupervisor a cette identifiant" + req.params.kcpSupervisorId
            });                
        }
        return res.status(500).send({
            message: "Aucun kcpSupervisor a cette identifiant " + req.params.kcpSupervisorId
        });
    });
};

// Update a kcpSupervisor identified by the kcpSupervisorId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.clientLastName||!req.body.clientFirstName||!req.body.command||!req.body.address) {
        console.log("infos kcpSupervisor incompletes")
        return res.status(400).send({
            message: "infos kcpSupervisor incompletes"
        });
    }

    // Find kcpSupervisor and update it with the request body
    _kcpSupervisor.findByIdAndUpdate(req.params.kcpSupervisorId, {
        clientFirstName: req.body.clientFirstName , 
        clientLastName: req.body.clientLastName,
        date: Date.now(),
        command: req.body.command,
        address: req.body.address
    }, {new: true})
    .then(kcpSupervisor => {
        if(!kcpSupervisor) {
            return res.status(404).send({
                message: "Aucun kcpSupervisor a cette identifiant " + req.params.kcpSupervisorId
            });
        }
        res.send(kcpSupervisor);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun kcpSupervisor a cette identifiant " + req.params.kcpSupervisorId
            });                
        }
        return res.status(500).send({
            message: "Error updating kcpSupervisor with id " + req.params.kcpSupervisorId
        });
    });
};

// Delete a kcpSupervisor with the specified kcpSupervisorId in the request
exports.delete = (req, res) => {
    _kcpSupervisor.findByIdAndRemove(req.params.kcpSupervisorId)
    .then(kcpSupervisor => {
        if(!kcpSupervisor) {
            return res.status(404).send({
                message: "Aucun kcpSupervisor a cette identifiant " + req.params.kcpSupervisorId
            });
        }
        res.send({message: "kcpSupervisor supprime avec succes!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Aucun kcpSupervisor a cette identifiant " + req.params.kcpSupervisorId
            });                
        }
        return res.status(500).send({
            message: "Impossible de supprimer un eleve avec cet indentifiant " + req.params.kcpSupervisorId
        });
    });
};


function getFiles(FILE_PATH){

try {
  const data = fs.readFileSync(FILE_PATH, 'utf8');
  console.log(data);

  return data
} catch (err) {
  console.error(err);
  return null;
}
};