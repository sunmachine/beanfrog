const {clientId} = require("../config.json");

function checkPermissions(permissions, message) {
    if (permissions) {
        return message.channel.permissionsFor(clientId).has(permissions);
    }

    return true;
}

module.exports = {
    execute(evt, ...args) {
        if (checkPermissions(evt.requiresPermissions, ...args)) {
            evt.execute(...args);
        } else {
            console.log(`Could not execute event: ${evt.name}, because bot lacks appropriate permissions to perform.`);
        }
    }
};