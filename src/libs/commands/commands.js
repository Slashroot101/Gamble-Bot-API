let db = require(`../database`);
let Commands = require(`./queries`);

exports.getByName = (commandName) => {
    return new Promise(async (resolve) => {
        let command = await db.query(Commands.getByName(commandName));
        resolve(command.rows[0]);
    });
};

exports.updateDurationAndUsage = (id, duration, usages) => {
    return new Promise(async(resolve) => {
        let command = await db.query(Commands.updateDurationAndUsage(id, duration, usages));
        resolve(command.rows[0]);
    });
}

exports.create = (duration, usages, name) => {
    return new Promise(async (resolve) => {
        let command = await db.query(Commands.create(duration, usages, name));
        resolve(command.rows[0]);
    });
};

exports.addToUserAudit = (commandID, userID, execDate = new Date()) => {
    return new Promise(async (resolve) => {
        let audit = await db.query(Commands.addToUserAudit(commandID, userID, execDate))
        resolve(audit.rows[0]);
    });
};

exports.getOldestAuditInDuration = (commandID, userID) => {
    return new Promise(async(resolve) => {
       let audit = await db.query(Commands.getOldestAuditInDuration(commandID, userID));
       resolve(audit.rows[0]);
    });
};

exports.getCommandHistoryCountByDuration = (commandID, userID) => {
    return new Promise(async (resolve) => {
        let audit = await db.query(Commands.getCommandHistoryCountByDuration(commandID, userID));
        if(audit.rows.length) {
          resolve(audit.rows[0]);
        } else {
          resolve();
        }
    });
};