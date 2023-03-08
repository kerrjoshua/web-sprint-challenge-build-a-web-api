const server = require('./api/server');

const port = 9000

server.listen(port,() => {
    console.log(`\n *** API is listening on port ${port} *** \n`)
})

