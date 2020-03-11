import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';

import { UserSchema } from './schemas/user.schema';
import { ClinicianSchema } from './schemas/clinician.schema';
import { PatientSchema } from './schemas/patient.schema';

@Module({
	imports: [MongooseModule.forFeature([
				{ name: 'User', schema: UserSchema }, 
				{ name: 'Clinician', schema: ClinicianSchema },
				{ name: 'Patient', schema: PatientSchema}
			  ])
			],
	controllers: [UsersController],
	providers: [UsersService]
})
export class UsersModule {}
