import { Box, Button, TextField } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddIconOutline from "@mui/icons-material/AddCircleOutlineOutlined";
import { ChangeEvent, useContext, useState } from "react";
import { EntriesContext } from '../../context/entries';


export const NewEntry = () => {

    const { addNewEntry } = useContext( EntriesContext );

    const [isAdding, setIsAdding] = useState(false);

    const [inputValue, setInputValue] = useState('');
    const [touched, setTouched] = useState(false);

    const onTextFieldChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        setInputValue( event.target.value );
    }

    const onSave = () => {
        if ( inputValue.length === 0 ) return;
        addNewEntry( inputValue );
        setIsAdding( false );
        setTouched( false );    
        setInputValue('');
    }

  return (
    <Box sx={{ marginBottom: 2, paddingX: 1.2}}>

        {
            isAdding ? (
                <>
                    <TextField 
                        fullWidth
                        sx={{ marginTop: 2, marginBottom: 1 }}
                        placeholder='Nueva entrada'
                        autoFocus
                        multiline
                        label='Nueva entrada'
                        helperText={ inputValue.length <= 0 && touched && 'Ingrese un valor' }
                        error={ inputValue.length <= 0 && touched }
                        value={ inputValue }
                        onChange={ onTextFieldChange }
                        onBlur={ () => setTouched(true) }
                    />

                    <Box display='flex' justifyContent='space-between'>
                        <Button
                            variant="text"
                            onClick={ () => {setIsAdding(false); setInputValue('')} }
                        >
                            Cancelar
                        </Button>

                        <Button
                            variant="outlined"
                            color='secondary'
                            endIcon={ <SaveOutlinedIcon /> }
                            onClick={ onSave }
                        >
                            Guardar
                        </Button>
                    </Box>
                </>
            ) : (
                <Button
                    startIcon= { <AddIconOutline /> }
                    variant='outlined'
                    fullWidth
                    onClick={ () => setIsAdding(true) }
                >
                    Agregar tarea
                </Button>
            )
        }

        
    


    </Box>
  )
}