// Get dependencies
import * as express from 'express';
import { join } from 'path';
import * as http from 'http';
import * as bodyParser from 'body-parser';

import * as mongoose from 'mongoose';

// Get our API routes
import api from './server/routes/api';

import { DatabaseConfig } from './server/config/database';

const app = express();

mongoose.connect(DatabaseConfig, { useNewUrlParser: true });

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
