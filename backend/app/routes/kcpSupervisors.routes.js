module.exports = (app) => {
    const kcpSupervisors = require('../controllers/kcpSupervisors.controller.js');

    // Create a new kcpSupervisor
    app.post('/kcpSupervisors/save', kcpSupervisors.processOkFiles);

    // Retrieve all kcpSupervisors
    app.get('/kcpSupervisors/getall', kcpSupervisors.findAll);

    // Retrieve a single kcpSupervisor with kcpSupervisorId
    app.get('/kcpSupervisors/getOne/:kcpSupervisorId', kcpSupervisors.findOne);

    // Update a kcpSupervisor with kcpSupervisorId
    app.put('/kcpSupervisors/:kcpSupervisorId', kcpSupervisors.update);

    // Delete a kcpSupervisor with kcpSupervisorId
    app.delete('/kcpSupervisors/:kcpSupervisorId', kcpSupervisors.delete);
}