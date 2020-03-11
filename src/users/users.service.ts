import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { CreateClinicianDTO } from './dto/create-clinician.dto';
import { CreatePatientDTO } from './dto/create-patient.dto';
import { UserDTO } from './dto/user.dto';
import { User } from './interfaces/user.interface';
import { AuthPayload } from '../auth/interfaces/auth-payload.interface';
import { Clinician } from './interfaces/clinician.interface';
import { Patient } from './interfaces/patient.interface';

@Injectable()
export class UsersService {
	
	constructor(@InjectModel('User') private userModel: Model<User>,
		@InjectModel('Clinician') private clinicianModel: Model<Clinician>,
			@InjectModel('Patient') private patientModel: Model<Patient>) {}

	async findAll(): Promise<User[]> {
		return await this.userModel.find();
	}

	async findAllClinicians(): Promise<Clinician[]> {
		return await this.clinicianModel.find();
	}

	async findOneClinician(id: string): Promise<Clinician> {
		return await this.clinicianModel.findOne({ _id: id });
	}

	async createClinician(clinicianDTO: CreateClinicianDTO) {
		
		const { firstName, lastName, email, password } = clinicianDTO;
		const user = await this.userModel.findOne({ email });
		if (user) {
		  throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
		}
		
		const saltRound = 10;
		const hash = bcrypt.hashSync(password, saltRound);

		const createdUser = new this.userModel({ email, password: hash});
		await createdUser.save();
		const createdClinician = new this.clinicianModel( { firstName, lastName, status: 'not verified', userId: createdUser._id});
		await createdClinician.save();
		
		return { user: this.sanitizeUser(createdUser), userType: 'clinician' }
    }
	
	async createPatient(patientDTO: CreatePatientDTO) {
		const { firstName, lastName, email, password, clinician } = patientDTO;
		const user = await this.userModel.findOne({ email });
		if (user) {
		  throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
		}

		const saltRound = 10;
		const hash = bcrypt.hashSync(password, saltRound);

		const createdUser = new this.userModel({ email: email, password: hash});
		await createdUser.save();
		const createdPatient = new this.patientModel({ firstName, lastName, clinician, userId: createdUser._id});
		await createdPatient.save();

		return { user: this.sanitizeUser(createdUser), userType: 'patient' }
    }

	async update(id: string, clinicianDTO: CreateClinicianDTO): Promise<Clinician> {
		const { firstName, lastName, status } = clinicianDTO;
		return this.clinicianModel.findByIdAndUpdate(id, { firstName, lastName, status }, { new: true});
	}
  
	async findByLogin(userDTO: UserDTO) {
		
		const { email, password } = userDTO;
		const user = await this.userModel
		  .findOne({ email });
		if (!user) {
		  throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
		}

		if (await bcrypt.compare(password, user.password)) {
			
			const clinician = await this.clinicianModel.findOne({ userId: user._id});
			if(clinician) {
				
				return { user: this.sanitizeUser(user), userType: 'clinician' }
			}
			
			const patient = await this.patientModel.findOne({ userId: user._id});
			if(patient) {
				
				return { user: this.sanitizeUser(user), userType: 'patient' }
			}
		    return { user: this.sanitizeUser(user), userType: 'superadmin' };
		} else {
		  throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
		}
	  }

	async findByPayload(authPayload: AuthPayload) {
		
		const { email } = authPayload;
		return await this.userModel.findOne({ email });
	  }

	sanitizeUser(user: User) {
		const sanitized = user.toObject();
		delete sanitized['password'];
		return sanitized;
		// return user.depopulate('password');
	}
}
