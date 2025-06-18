const express = require('express');
const connectDB = require('./configs/connect-mogodb');
const { env } = require('./configs/environment');
const apiRoutes = require('./routes');

connectDB();

const server = express();
server.use(express.json());

// router
server.use('/api', apiRoutes);

const PORT = env.PORT;
const HOSTNAME = env.HOSTNAME;

server.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
