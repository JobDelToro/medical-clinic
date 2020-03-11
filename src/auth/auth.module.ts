import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from '../users/schemas/user.schema';
import { ClinicianSchema } from '../users/schemas/clinician.schema';
import { PatientSchema } from '../users/schemas/patient.schema';

import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
	imports: [UsersModule, MongooseModule.forFeature([
				{ name: 'User', schema: UserSchema }, 
				{ name: 'Clinician', schema: ClinicianSchema },
				{ name: 'Patient', schema: PatientSchema}
			  ])],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, UsersService]
})
export class AuthModule {}
