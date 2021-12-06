const {Permissions} = require("discord.js");
const frogReactionTriggers = [
    '🐸',
    'amphib',
    'frog',
    'toad',
]

const frogReactionEmoji = '🐸';

module.exports = {
    name: 'messageCreate',
    requiresPermissions: [
        Permissions.FLAGS.READ_MESSAGE_HISTORY,
        Permissions.FLAGS.ADD_REACTIONS
    ],
    async execute(message) {
        if (frogReactionTriggers.find(e => message.content.includes(e))) {
            await message
                .react(frogReactionEmoji)
                .then(() => console.log(`Reacted to user with emoji: ${frogReactionEmoji}`));
        }
    }
};
