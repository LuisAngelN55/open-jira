import { useState, ChangeEvent, useMemo, FC, useContext } from 'react';
import { GetServerSideProps } from 'next';

import { capitalize, Grid, Card, CardHeader, CardContent, TextField, CardActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, IconButton } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { MainLayout } from "../../components/layouts";
import { Entry, EntryStatus } from "../../interfaces";
import { dbEntries } from '../../database';
import { EntriesContext } from '../../context/entries';
import { useRouter } from 'next/router';
import { dateFunctions } from '../../utils';


const validStatus: EntryStatus[] = [ 'pending', 'in-progress', 'finished'];

interface Props {
    entry: Entry
}



const EntryPage:FC<Props> = ( props ) => {
    const { entry } = props;
    const router = useRouter()
    const { updateEntry, deleteEntry } = useContext( EntriesContext )

    const [inputValue, setInputValue] = useState(entry.description);
    const [status, setStatus] = useState<EntryStatus>(entry.status);
    const [touched, setTouched] = useState(false);

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

    const onInputValueChanged = ( event: ChangeEvent<HTMLInputElement> ) => {
        setInputValue( event.target.value );
    }

    const onStatusChanged = ( event: ChangeEvent<HTMLInputElement> ) => {
        setStatus( event.target.value as EntryStatus );
    }

    const onSave = () => {
        
        if ( inputValue.trim().length === 0 ) return;
        
        const updatedEntry: Entry = {
            ...entry,
            status,
            description: inputValue,
        }
        updateEntry( updatedEntry, true );
    }

    const onDelete = () => {
        deleteEntry( entry._id )
        router.push(`/`);
    }

  return (
    <MainLayout title={ inputValue.substring(0,20) + '...'}>
        <Grid
            container
            justifyContent='center'
            sx={{ marginTop: 2 }}
        >
            <Grid item xs={ 12 } sm={ 8 } md={ 6 }>
                <Card>
                    <CardHeader
                        title= {`Entrada:`}

                        subheader={`Creada ${ dateFunctions.getformatDistanceToNow(entry.createdAt) } minutos`}
                    />
                    <CardContent>
                        <TextField 
                            sx={{ marginTop: 2, marginBottom: 1}}
                            fullWidth
                            placeholder="Nueva entrada"
                            autoFocus
                            multiline
                            label="Nueva entrada"
                            value={ inputValue }
                            onChange= { onInputValueChanged }
                            onBlur= { () => setTouched( true ) }
                            helperText= { isNotValid && 'Ingrese un valor' }
                            error={ isNotValid }
                        />

                        <FormControl>
                            <FormLabel>Estado</FormLabel>
                            <RadioGroup
                                row
                                value={ status }
                                onChange= { onStatusChanged }
                            >
                                {
                                    validStatus.map( option => (
                                        <FormControlLabel 
                                            key={ option }
                                            value= { option }
                                            control={ <Radio />}
                                            label={ capitalize(option) }
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                    </CardContent>
                        <Button
                            startIcon={ <SaveOutlinedIcon /> }
                            variant='contained'
                            fullWidth
                            onClick={ onSave }
                            disabled= { inputValue.length <= 0 }
                        >
                            Save
                        </Button>
                    <CardActions>

                    </CardActions>

                </Card>
            </Grid>
        </Grid>

        <IconButton 
        onClick={ onDelete }
        sx={{
            position: 'fixed',
            bottom: 30,
            right: 30,
            backgroundColor: 'error.dark'
        }}>
            <DeleteOutlinedIcon />
        </IconButton>

    </MainLayout>
  )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    
    // esto se ejecuta del lado del servidor
    const { params } = ctx;
    const { id } = params as { id: string };

    const entry =  await dbEntries.getEntryById( id );

    if ( !entry ) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            entry
        }
    }
}


export default EntryPage;
