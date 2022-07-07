const app = require('./app');
const http = require('http');
const logger = require('./utilis/logger');
const config = require('./utilis/config');

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info('Server running on port', config.PORT);
});
