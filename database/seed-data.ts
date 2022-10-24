
interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Pendiente: entry 1',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            description: 'in-progress: entry 2',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        },
        {
            description: 'finished: entry 3',
            status: 'finished',
            createdAt: Date.now() - 50000000,
        },
    ]
}