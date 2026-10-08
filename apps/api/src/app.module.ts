import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnvironment } from './config.js';
import { HealthController } from './health/health.controller.js';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env', validate: validateEnvironment })],
  controllers: [HealthController],
})
export class AppModule {}
