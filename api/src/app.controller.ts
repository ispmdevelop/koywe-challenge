import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller()
export class AppController {
  constructor() {}

  @ApiOperation({
    summary: 'Get service health',
    description: 'Check if the service is up and running',
  })
  @Get('/health')
  getHealth(): string {
    return 'Ok';
  }
}
