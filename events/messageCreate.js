const {Permissions} = require("discord.js");

const frogReactionEmoji = '🐸';
const frogReactionTriggers = [
    '🐸',
    'amphib',
    'frog',
    'toad',
];

const illegalSymbols = {
    "1": "l",
    "3": "e",
    "4": "a",
    "5": "s",
    "7": "t",
    "0": "o",
    "@": "o",
};

function normalize(text) {
    text = text.toLowerCase();
    for (let symbol in illegalSymbols) {
        text = text.replaceAll(symbol.toLowerCase(), illegalSymbols[symbol]);
    }

    return text;
}

function canTriggerReaction(text) {
    // Early-out.
    if ( !text ) { return false; }

    // Early-out if there is an exact match.
    const normalized = normalize(text);
    if (frogReactionTriggers.find(e => normalized.includes(e))) {
        return true;
    }

    let exp = ""; 
    for(let i = 0; i < normalized.length; ++i) {
        const letter = normalized[i];
        exp += `\\s*${letter}\\s*`;
    }

    return normalized.match(new RegExp(exp));
}

module.exports = {
    name: 'messageCreate',
    requiresPermissions: [
        Permissions.FLAGS.READ_MESSAGE_HISTORY,
        Permissions.FLAGS.ADD_REACTIONS
    ],
    async execute(message) {
        if (canTriggerReaction(message.content)) {
            await message
                .react(frogReactionEmoji)
                .then(() => console.log(`Reacted to user with emoji: ${frogReactionEmoji}`));
        }
    }
};
