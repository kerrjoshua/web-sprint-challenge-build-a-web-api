const express = require('express');
const { logger } = require('./middleware/middleware')
const projectRoutes = require('./projects/projects-router')

const server = express();

server.use(express.json())
server.use(logger)
server.use('/api/projects', projectRoutes)
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use('*', (req, res) => {
    res.status(404).json({ message: 'That resource doesn\'t seem to exist yet.'})
})

module.exports = server;
