const router = new (require('restify-router')).Router();
const Guild = require('../libs/guild/guild');
const { responseHandler, errorHandler } = require('../libs/responseHandler');

router.post('/', async (req, res, next) => {
  try {
    req.body.guilds.forEach(async (element) => {
      console.log(element)
      const guild = await Guild.create(element);
      if (guild) {
        await Guild.createGuildBank(guild.id);
      }
    });
    responseHandler(res, { guilds: req.body.guilds });
  } catch (err) {
    errorHandler(res, err);
  }
  next();
});

router.put('/id/:guildID/points', async (req, res, next) => {
  try {
    const guildPoints = await Guild.addPointsToGuildBank(req.params.guildID, req.params.points);
    responseHandler(res, { guildPoints });
  } catch (err) {
    console.log(err)
    errorHandler(res, err);
  }
  next();
});

router.get('/guild-id/:id', async (req, res, next) => {
  try {
    const guild = await Guild.getByGuildID(req.params.id);
    responseHandler(res, { guild });
  } catch (err) {
    errorHandler(res, err);
  }
  next();
});

router.get('/discord-guild-id/:id/bank', async (req, res, next) => {
  try {
    const guildBank = await Guild.getGuildBankByGuildID(req.params.id);
    responseHandler(res, { guildBank });
  } catch (err) {
    errorHandler(res, err);
  }
  next();
});

module.exports = router;
