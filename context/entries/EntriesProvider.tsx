import { FC, useReducer } from 'react';
import { v4 as uuidv4 } from "uuid"; //run> yarn add -D @types/uuid

import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';

export interface EntriesState {
    entries: Entry[];
}

interface Props {
    children: React.ReactNode;
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'Pendiente: entry 1',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            _id: uuidv4(),
            description: 'in-progress: entry 2',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        },
        {
            _id: uuidv4(),
            description: 'finished: entry 3',
            status: 'finished',
            createdAt: Date.now() - 50000000,
        },
    ],
}

export const EntriesProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( entriesReducer, Entries_INITIAL_STATE );

    const addNewEntry = ( description: string ) => {
        const newEntry: Entry = {
            _id: uuidv4(),
            description,
            createdAt: Date.now(),
            status: 'pending'
        }

        dispatch({ type: '[Entry] - Add Entry', payload: newEntry });
    }

  return (
    <EntriesContext.Provider value={{
        ...state,

        // Methods
        addNewEntry,
    }}>
        { children }
    </EntriesContext.Provider>
  )
}