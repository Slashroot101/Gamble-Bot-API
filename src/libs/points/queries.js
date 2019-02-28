exports.create = userID => ({
  name: 'create-user-points',
  text: 'INSERT INTO points(current_balance, total_points_gained, user_id) VALUES($1, $2, $3)',
  values: [0, 0, userID],
});

exports.addToPointsLog = (commandHistoryID, points) => ({
  name: 'add-to-point-log',
  text: 'INSERT into points_audit_log(command_history_id, points) VALUES ($1, $2) RETURNING *',
  values: [commandHistoryID, points],
});

exports.addPointsByDiscordID = (discordID, points) => ({
  name: 'add-user-points-by-did',
  text: 'UPDATE points SET points.current_balance = points.current_balance + $2, points.total_points_gained =  total_points_gained + CASE When $2 < 0 THEN 0 ELSE $2 END JOIN USERS ON users.id = points.user_id WHERE users.discord_id = $1',
  values: [discordID, points],
});

exports.getNetCommandPoints = (commandID, userID) => ({
  name: 'get-net-command-points',
  text: 'SELECT * FROM net_command_points WHERE command_id = $1 and user_id = $2',
  values: [commandID, userID],
});

exports.addPointsByUserID = (userID, points) => ({
  name: 'add-user-points-by-uid',
  text: 'UPDATE points SET current_balance = current_balance + $2, total_points_gained = total_points_gained + CASE When $2 < 0 THEN 0 ELSE $2 END WHERE user_id = $1',
  values: [userID, points],
});

exports.getLeaderboardByPageNumber = pageNumber => ({
  name: 'get-leaderboard-by-page-number',
  text: 'SELECT * FROM points JOIN users ON points.user_id = users.id ORDER BY current_balance DESC limit 10 OFFSET $1 * 10',
  values: [pageNumber],
});

exports.getNumberOfRows = () => ({
  name: 'get-row-count-for-points',
  text: 'SELECT count(id) FROM points',
  values: [],
});
