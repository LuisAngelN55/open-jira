

export interface Entry {
    _id: string;
    description: string;
    createdAt: number;
    status: EntryStatus; // A, B, C => pending, in-progress, finished
}

export type EntryStatus = 'pending' | 'in-progress' | 'finished';