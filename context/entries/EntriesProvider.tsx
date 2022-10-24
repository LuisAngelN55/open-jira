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
    entries: [],
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

    const updateEntry = ( entry: Entry) => {

        dispatch({ type: '[Entry] - Update Entry', payload: entry });
    }

  return (
    <EntriesContext.Provider value={{
        ...state,

        // Methods
        addNewEntry,
        updateEntry,
    }}>
        { children }
    </EntriesContext.Provider>
  )
}