import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data = 
| { message: string }
| IEntry;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { id } = req.query;

    if ( !mongoose.isValidObjectId( id ) ) {
        return res.status(400).json({ message: 'El id no es válido: ' + id });
    }
    
    switch ( req.method ) {
        case 'PUT':
            return updateEntry( req, res );
            
        case 'GET':
            return getEntry( req, res );

        default:
            return res.status(400).json({ message: 'Método no existe' });
    }
}

const updateEntry = async( req:NextApiRequest, res:NextApiResponse ) => {

    const { id } = req.query;
    
    await db.connect();
    const entryToUpdate = await Entry.findById( id );

    if ( !entryToUpdate ) {
        await db.disconnect();
        return res.status(400).json({ message: 'No hay entrada con ese id: ' + id })
    }

    const {
        description = entryToUpdate.description,
        status = entryToUpdate.status,
    } = req.body;

    try {
        // * Esta es más pesada porque vuelve a buscar por ID y luego guarda
        const updatedEntry = await Entry.findByIdAndUpdate( id, { description, status }, { runValidators: true, new: true });
    
        // * Esta es más liviana porque solo guarda sobre la entrada
        // entryToUpdate.description = description;
        // entryToUpdate.status = status;
        // await entryToUpdate.save();
        
        await db.disconnect();
        return res.status(200).json( updatedEntry! );
        
    } catch (error: any) {
        console.log({ error });
        await db.disconnect();
        res.status(400).json({ message: error.errors.status.message });
    }
}


const getEntry = async( req:NextApiRequest, res:NextApiResponse ) => {

    const { id } = req.query;
    
    await db.connect();
    const foundEntry = await Entry.findById( id );

    if ( !foundEntry ) {
        await db.disconnect();
        return res.status(400).json({ message: 'No hay entrada con ese id: ' + id })
    }

    return res.status(200).json( foundEntry );

}