import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { CreateClinicianDTO } from '../users/dto/create-clinician.dto';
import { CreatePatientDTO} from '../users/dto/create-patient.dto';
import { UserDTO } from '../users/dto/user.dto';
import { AuthPayload } from './interfaces/auth-payload.interface';

@Controller('api/auth')
export class AuthController {
	
	constructor(
		private userService: UsersService,
		private authService: AuthService,
  	) {}
	
	  @Get()
	  @UseGuards(AuthGuard('jwt'))
	  tempAuth() {
		  return { auth: 'authenicated'}
	  }
	
	  @Post('login')
	  async login(@Body() userDTO: UserDTO) {
		const { user, userType } = await this.userService.findByLogin(userDTO);
		//Payload for jsonwebtoken
		const authPayload: AuthPayload = {
		  email: user.email,
		};
		const token = await this.authService.signPayload(authPayload);
		return { user, userType, token };
	  }

	  @Post('register/clinician')
	  async registerClinician(@Body() clinicianDTO: CreateClinicianDTO) {
		const { user, userType } = await this.userService.createClinician(clinicianDTO);
		//Payload for jsonwebtoken
		const authPayload: AuthPayload = {
		  email: user.email,
		};
		const token = await this.authService.signPayload(authPayload);
		return { user, userType, token };
	  }

	  @Post('register/patient')
	  async registerPatient(@Body() patientDTO: CreatePatientDTO) {
		const { user, userType } = await this.userService.createPatient(patientDTO);
		//Payload for jsonwebtoken
		const authPayload: AuthPayload = {
		  email: user.email,
		};
		const token = await this.authService.signPayload(authPayload);
		return { user, userType, token };
	  }
}
