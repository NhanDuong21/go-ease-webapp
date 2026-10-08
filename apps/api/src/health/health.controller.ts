import { Controller, Get } from '@nestjs/common';
import { API_SERVICE, type HealthResponse } from '@goease/contracts';

@Controller('health')
export class HealthController {
  @Get()
  health(): HealthResponse {
    return { status: 'ok', service: API_SERVICE, scope: 'api-only', timestamp: new Date().toISOString() };
  }
}
