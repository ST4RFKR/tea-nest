import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieDto } from './dto/movie.dto';
type RequestHeaders = Record<string, string>;

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}
  // @Get()
  // findAll(@Query() query: any) {
  //   return `Фильмы с параметрами ${JSON.stringify(query)}`;
  // }

  // @Get(`:id/series/:seriesId`)
  // findOne(@Param() params: { id: string; seriesId: string }) {
  //   const { id, seriesId } = params;
  //   return `Сериал ${id} серия ${seriesId}`;
  // }

  // @Post()
  // create(@Body() body: { title: string; year: number }) {
  //   const { title, year } = body;
  //   return `Фильмы  ${title}, год ${year} был добавлен`;
  // }

  // @Get('headers')
  // getHeaders(@Headers() headers: RequestHeaders) {
  //   return headers;
  // }

  // @Get('user-agent')
  // getUserAgent(@Headers('user-agent') userAgent: string) {
  //   return { userAgent };
  // }

  @Get()
  findAll() {
    return this.movieService.fingAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.movieService.findById(+id);
  }

  @Post()
  create(@Body() dto: MovieDto) {
    return this.movieService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: MovieDto) {
    return this.movieService.update(+id, dto);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.movieService.delete(+id);
  }
}
