import { FC, useReducer, useEffect } from 'react';
import { useSnackbar } from "notistack";

import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';
import entriesApi from '../../apis/entriesApi';

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
    const { enqueueSnackbar } = useSnackbar();

    const addNewEntry = async( description: string ) => {

        try {
            const { data } = await entriesApi.post<Entry>('/entries', { description: description });
    
            dispatch({ type: '[Entry] - Add Entry', payload: data });
            
        } catch (error) {
            console.log('Error creando la nueva entrada') 
        }
    }

    const updateEntry = async( { _id, description, status }: Entry, showSnackbar = false) => {
        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${ _id }`, { description , status });
            dispatch({ type: '[Entry] - Update Entry', payload: data });

            
            if ( showSnackbar )
                enqueueSnackbar( 'Entrada atualizada', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                })


            
        } catch (error) {
                console.log({ error });
        }
    }



    const deleteEntry = async( _id: string ) => {

        try {
            await entriesApi.delete<Entry>(`/entries/${ _id }` );
            const { data } = await entriesApi.get<Entry[]>('/entries');
            dispatch({ type: '[Entry] - Delete Entry', payload: data });

            enqueueSnackbar( 'Entrada Borrada', {
                variant: 'error',
                autoHideDuration: 1500,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            })
        }
         catch (error) {
            console.log('No se pudo eliminar la entrada') 
        }
    }



    const refreshEntries = async() => {

        
        try {
            const { data } = await entriesApi.get<Entry[]>('/entries');
            dispatch({ type: '[Entry] - Refres Data', payload: data });
            
        } catch (error) {
            console.log('hubo un error consultando las entradas');
            console.log(error);
        }

    }

    useEffect(() => {
        refreshEntries();
    }, [])  

  return (
    <EntriesContext.Provider value={{
        ...state,

        // Methods
        addNewEntry,
        updateEntry,
        deleteEntry,
    }}>
        { children }
    </EntriesContext.Provider>
  )
}