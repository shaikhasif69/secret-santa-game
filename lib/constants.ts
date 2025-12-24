export const PARTICIPANTS = ['Asif', 'Mehreen', 'Tahir', 'Simran', 'Sobia'] as const;

export type ParticipantName = typeof PARTICIPANTS[number];

export const CHARACTERS = [
    { id: 'santa', name: 'Santa Claus', emoji: '🎅' },
    { id: 'elf', name: 'Elf', emoji: '🧝' },
    { id: 'reindeer', name: 'Reindeer', emoji: '🦌' },
    { id: 'snowman', name: 'Snowman', emoji: '⛄' },
    { id: 'gingerbread', name: 'Gingerbread', emoji: '🍪' },
] as const;

export type CharacterId = typeof CHARACTERS[number]['id'];

// Special pairing: Asif <-> Mehreen
export const SPECIAL_PAIRINGS: Record<string, string> = {
    'Asif': 'Mehreen',
    'Mehreen': 'Asif',
};
