const express = require('express')
const Projects = require('./projects-model')
const { checkProjectId, checkProjectShape } = require('./projects-middleware')

const router = express.Router();

router.get('/', (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.json(projects)
        })
        .catch(next)
})

router.get('/:id', checkProjectId, (req, res, next) => {
    res.json(req.project)
})

router.get('/:id/actions', checkProjectId, (req, res, next) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            res.json(actions)
        })
        .catch(next)
})

router.post('/', checkProjectShape, (req, res, next) => {
    Projects.insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject);
        })
        .catch(next)
})

router.put('/:id', checkProjectId, checkProjectShape, (req, res, next) => {
    const id = req.params.id;
    Projects.update(id, req.body)
        .then(updatedProj => {
            res.json(updatedProj)
        })
        .catch(next)
})

router.delete('/:id', checkProjectId, (req, res, next) => {
    Projects.remove(req.params.id)
        .then(() => {
            console.log(`Project with id ${req.params.id} was successfully deleted.`)
            res.status(200).json()
        })
        .catch(next)
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        customMessage: 'Something smells rotten in the Projects router.'
    })
})

module.exports = router;
