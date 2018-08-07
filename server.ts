// Get dependencies
import * as express from 'express';
import { join } from 'path';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import { readFileSync } from 'fs';
import * as mongoose from 'mongoose';

// Get our API routes
import api from './server/routes/api';

import { DatabaseConfig } from './server/config/database';
import { VotingAuth } from './server/middleware/auth';

const serverConfig = JSON.parse(readFileSync('./server.config.json', { encoding: 'utf8' }));

const app = express();

mongoose.connect(DatabaseConfig, { useNewUrlParser: true });

// Auth
const clientId = serverConfig['OAUTH2_CLIENT_ID'];
const votingAuth = new VotingAuth(clientId);
app.use(votingAuth.authenticateUser);

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Point static path to dist
// app.use(express.static(path.join(__dirname, 'dist', 'client', 'voting')));

// Set our api routes
app.use('/api', api);

// Serve static files and index.html for other routes
const CLIENT_DIST_FOLDER = join(process.cwd(), 'dist', 'client');
app.get('*.*', express.static(CLIENT_DIST_FOLDER));
app.get('*', (req, res) => {
  res.sendFile(join(CLIENT_DIST_FOLDER, 'index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
const hostname = process.env.HOST || 'localhost';
server.listen(port, hostname, () => console.log(`API running on localhost:${port}`));
