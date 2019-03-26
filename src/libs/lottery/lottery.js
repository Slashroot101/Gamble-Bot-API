const db = require('../database');
const Lottery = require('./queries');

exports.create = lotteryObject => new Promise(async (resolve) => {
  const lottery = await db.query(Lottery.create(lotteryObject));
  resolve(lottery.rows[0]);
});

exports.findPossibleOverlap = (duration, guildID) => new Promise(async (resolve) => {
  const overlapLottery = await db.query(Lottery.findPossibleOverlap(duration, guildID));
  resolve(overlapLottery.rows);
});

exports.getExpiredLotteries = () => new Promise(async (resolve) => {
  const expiredLotteries = await db.query(Lottery.getAllExpiredLotteries());
  resolve(expiredLotteries.rows);
});

exports.getActiveLotteryForUserByUserID = userID => new Promise(async (resolve) => {
  const activeLotteries = await db.query(Lottery.getActiveLotteryForUserByUserID(userID));
  resolve(activeLotteries.rows[0]);
});

exports.setLotteryStatus = (lotteryID, isDone) => new Promise(async (resolve) => {
  const updatedLottery = await db.query(Lottery.setLotteryStatus(lotteryID, isDone));
  resolve(updatedLottery.rows[0]);
});

exports.pickLotteryWinner = lotteryID => new Promise(async (resolve) => {
  const lotteryWinner = await db.query(Lottery.getLotteryWinner(lotteryID));
  resolve(lotteryWinner.rows[0]);
});

exports.getLotteryJackpot = lotteryID => new Promise(async (resolve) => {
  const lotteryJackpot = await db.query(Lottery.getLotteryJackpot(lotteryID));
  resolve(lotteryJackpot.rows[0]);
});

exports.getLotteryByID = lotteryID => new Promise(async (resolve) => {
  const lottery = await db.query(Lottery.getLotteryByID(lotteryID));
  resolve(lottery.rows[0]);
});

exports.getLotteryForGuildByDiscordGuildID = guildID => new Promise(async (resolve) => {
  const guildLottery = await db.query(Lottery.getLotteryForGuildByDiscordGuildID(guildID));
  resolve(guildLottery.rows[0]);
});

exports.setConsumedByQueue = lotteryID => new Promise(async (resolve) => {
  const updatedGuild = await db.query(Lottery.setConsumedByQueue(lotteryID));
  resolve(updatedGuild.rows[0]);
});

exports.setWinner = (lotteryID, userID) => new Promise(async (resolve) => {
  const lottery = await db.query(Lottery.setWinner(lotteryID, userID));
  resolve(lottery.rows[0]);
});

exports.getCurrentGlobalLottery = () => new Promise(async (resolve) => {
  const globalLottery = await db.query(Lottery.getCurrentGlobalLottery());
  resolve(globalLottery.rows[0]);
});
