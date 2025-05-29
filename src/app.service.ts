import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hola, api Restful con NestJS y MongoDB';
  }
}
