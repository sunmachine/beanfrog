const frogReactionTriggers = [
    '🐸',
    'amphib',
    'frog',
    'toad',
]

const frogReactionEmoji = '🐸';

module.exports = {
    name: 'messageCreate',
    execute(message) {
        if ( frogReactionTriggers.find(e => message.content.includes(e)) ) {
            message
                .react(frogReactionEmoji)
                .then(() => console.log(`Reacted to user with emoji: ${frogReactionEmoji}`));
        }
    }
};
