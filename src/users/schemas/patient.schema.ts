import * as mongoose from 'mongoose';

export const PatientSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
	clinician:  {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
	userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    }
});