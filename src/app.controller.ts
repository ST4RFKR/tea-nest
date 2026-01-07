import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { StringToLowerCasePipe } from './common/pipes/string-to-lowercase';
import { AuthGuard } from './common/guards/auth.guard';
import { UserAgent } from './common/decprators/user-agent.decorator';
import { AllExaptionsFilter } from './common/filters/all-exaptions.filters';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @UsePipes(StringToLowerCasePipe)
  @Post()
  create(@Body('title') title: string) {
    return `Movie title: ${title}`;
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getProdile(@UserAgent() userAgent: string) {
    return {
      id: 1,
      name: 'John Doe',
      email: 'RcV4o@example.com',
      userAgent,
    };
  }
}
