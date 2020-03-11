import { Document } from 'mongoose';

export interface Clinician extends Document {
	id?: string;
	firstName?: string;
	lastName?: string;
	status?: string;
	userId: string;
}