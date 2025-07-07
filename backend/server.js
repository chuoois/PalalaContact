const express = require('express');
const cors = require('cors'); // Add this line
const connectDB = require('./configs/connect-mogodb');
const { env } = require('./configs/environment');
const apiRoutes = require('./routes');

connectDB();

const server = express();
server.use(express.json());
server.use(cors({
  origin: env.FRONTEND_URL,
  credentials: true,
}));

// router
server.use('/api', apiRoutes);

server.listen(env.PORT, env.HOSTNAME, () => {
    console.log(`Server running at http://${env.HOSTNAME}:${env.PORT}/`);
    console.log('CORS allowed origin:', env.FRONTEND_URL);

});