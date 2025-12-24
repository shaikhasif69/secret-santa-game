export interface Participant {
    id?: string;
    name: 'Asif' | 'Mehreen' | 'Tahir' | 'Simran' | 'Sobia';
    email: string;
    character: 'santa' | 'elf' | 'reindeer' | 'snowman' | 'gingerbread';
    assignedTo?: string;
    isDemoMode: boolean;
    selectedAt?: string;
}

export interface GameState {
    selectedCharacters: string[];
    assignedParticipants: string[];
    availableForAssignment: string[];
}

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}
