import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {

    status(): { message: string } {
        return { message: "Service is healthy" }
    }

}
