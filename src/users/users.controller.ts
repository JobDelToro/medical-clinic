import { Body, Controller, Get, Put, Param } from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { Clinician } from './interfaces/clinician.interface';
import { CreateClinicianDTO } from './dto/create-clinician.dto';

@Controller('api/users')
export class UsersController {
	
	constructor(private usersService: UsersService){}
	
	@Get()
	findAll(): Promise<User[]> {
		return this.usersService.findAll();
	}
	
	@Get('/clinicians')
	findAllClinicians(): Promise<Clinician[]> {
		return this.usersService.findAllClinicians();
	}
	
	@Get('/clinicians/:id')
	findOneClinician(@Param('id') id): Promise<Clinician> {
		return this.usersService.findOneClinician(id);
	}

	@Put('/clinicians/:id')
	update(@Body() updateClinicianDTO: CreateClinicianDTO, @Param('id') id): Promise<Clinician> {
		return this.usersService.update(id, updateClinicianDTO);
	}
	
}
