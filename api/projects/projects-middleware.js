const Projects = require('./projects-model')

function checkProjectId (req, res, next) {
    Projects.get(req.params.id)
        .then(project => {
            if (project) {
                req.project = project;
                next()
            } else {
                next({status: 404, message: `There is no project with the id of ${req.params.id}.`})
            }
        })
        .catch(next)
}

module.exports = {
    checkProjectId,
}
