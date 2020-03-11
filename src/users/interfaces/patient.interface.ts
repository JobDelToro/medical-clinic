import { Document } from 'mongoose';

export interface Patient extends Document{
	id?: string;
	firstName?: string;
	lastName?: string;
	clinician?: string;
	userId: string;
}