import * as mongoose from 'mongoose';

export const ClinicianSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
	status: String,
	userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    }
});