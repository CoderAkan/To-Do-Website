import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // http://localhost:3002/api/
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  // http://localhost:3002/api/profile
  @Get('profile')
  getProfile(): string {
    return this.appService.getProfile();
  }
}
