import { useState, ChangeEvent } from 'react';
import { MainLayout } from "../../components/layouts";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { capitalize, Grid, Card, CardHeader, CardContent, TextField, CardActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, IconButton } from '@mui/material';
import { EntryStatus } from "../../interfaces";

const validStatus: EntryStatus[] = [ 'pending', 'in-progress', 'finished'];

const EntryPage = () => {

    const [inputValue, setInputValue] = useState('');
    const [status, setStatus] = useState<EntryStatus>('pending');
    const [touched, setTouched] = useState(false);

    const onInputValueChanged = ( event: ChangeEvent<HTMLInputElement> ) => {
        setInputValue( event.target.value );
    }

    const onStatusChanged = ( event: ChangeEvent<HTMLInputElement> ) => {
        setStatus( event.target.value as EntryStatus );
    }

    const onSave = () => {
        console.log( { inputValue, status })
    }

  return (
    <MainLayout title="... ... ...">
        <Grid
            container
            justifyContent='center'
            sx={{ marginTop: 2 }}
        >
            <Grid item xs={ 12 } sm={ 8 } md={ 6 }>
                <Card>
                    <CardHeader
                        title= {`Entrada: ${ inputValue }`}

                        subheader={`Creada hace: ----- minutos`}
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
                        >
                            Save
                        </Button>
                    <CardActions>

                    </CardActions>

                </Card>
            </Grid>
        </Grid>

        <IconButton sx={{
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

export default EntryPage;
