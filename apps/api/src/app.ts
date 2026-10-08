import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module.js';
import { ApiExceptionFilter } from './common/api-exception.filter.js';
import type { Environment } from './config.js';

export async function createApp(logging = true) {
  const app = await NestFactory.create(AppModule, { logger: logging ? ['log', 'warn', 'error'] : false });
  const config = app.get(ConfigService<Environment, true>);
  app.setGlobalPrefix('api');
  app.enableCors({ origin: config.get('WEB_ORIGINS', { infer: true }), credentials: false, methods: ['GET', 'OPTIONS'] });
  app.useGlobalFilters(new ApiExceptionFilter());
  app.enableShutdownHooks();
  return app;
}
