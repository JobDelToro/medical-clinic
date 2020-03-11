import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import config from './config/keys';

@Module({
  imports: [
	  			AuthModule, 
	  			UsersModule, 
	  			MongooseModule.forRoot(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
		   ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
