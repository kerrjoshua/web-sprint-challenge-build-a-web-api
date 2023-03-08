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

function checkProjectShape (req, res, next) {
    const { name, description } = req.body;
    if (!name || !description) {
        res.status(400).json({message: 'Projects need to have a name and a description.'})
    } else { next() }
}

module.exports = {
    checkProjectId,
    checkProjectShape,
}
