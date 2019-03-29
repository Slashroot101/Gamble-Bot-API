const restify = require('restify');
const router = new (require('restify-router')).Router();

const server = restify.createServer({
  name: 'Gamble-Bot-API',
  version: '1.0.0',
});

const logger = require('../basic-logger');

const home = require('./routes');
const user = require('./routes/user');
const points = require('./routes/points');
const commands = require('./routes/commands');
const guild = require('./routes/guild');
const lottery = require('./routes/lottery');
const lotteryTickets = require('./routes/lotteryTickets');
const channels = require('./routes/channel');

server.use(restify.plugins.throttle({
  burst: 100, // Max 10 concurrent requests (if tokens)
  rate: 5000, // Steady state: 2 request / 1 seconds
  ip: true,		// throttle per IP
}));
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.gzipResponse());

router.add('/api', home);
router.add('/users', user);
router.add('/points', points);
router.add('/commands', commands);
router.add('/guilds', guild);
router.add('/lotteries', lottery);
router.add('/lottery-tickets', lotteryTickets);
router.add('/channels', channels);
router.applyRoutes(server);

server.on('after', restify.plugins.metrics({ server }, (err, metrics) => {
  console.log(err);
  logger.trace(`${metrics.method} ${metrics.path} ${metrics.statusCode} ${metrics.latency} ms`);
}));

server.listen(8080, () => {
  logger.info('%s listening at %s', server.name, server.url);
});

server.on('uncaughtException', (req, res, route, err) => {
  logger.error(err);
});
