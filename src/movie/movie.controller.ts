import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
type RequestHeaders = Record<string, string>;

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}
  @Get()
  findAll(@Query() query: any) {
    return `Фильмы с параметрами ${JSON.stringify(query)}`;
  }

  @Get(`:id/series/:seriesId`)
  findOne(@Param() params: { id: string; seriesId: string }) {
    const { id, seriesId } = params;
    return `Сериал ${id} серия ${seriesId}`;
  }

  @Post()
  create(@Body() body: { title: string; year: number }) {
    const { title, year } = body;
    return `Фильмы  ${title}, год ${year} был добавлен`;
  }

  @Get('headers')
  getHeaders(@Headers() headers: RequestHeaders) {
    return headers;
  }

  @Get('user-agent')
  getUserAgent(@Headers('user-agent') userAgent: string) {
    return { userAgent };
  }
}
