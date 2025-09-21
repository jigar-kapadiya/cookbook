import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
    constructor(private readonly health: HealthService) { }
    @Get()
    status(): { message: string } {
        return this.health.status()
    }
}
