import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SerialService } from './serial.service';
import { CreateSerialDto } from './dto/create-serial.dto';

@ApiTags('serial')
@Controller('serial')
export class SerialController {
  constructor(private readonly serialService: SerialService) {}
  @ApiOperation({ summary: 'Get all serials', description: 'Get all serials' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Get all serials' })
  @Get()
  findAll() {
    return [
      { id: 1, title: 'The Witcher', genre: 'Action', releaseYear: 2022 },
      { id: 2, title: 'Punisher', genre: 'Action', releaseYear: 2022 },
      { id: 3, title: 'Pulp Fiction', genre: 'Action', releaseYear: 2022 },
    ];
  }
  @ApiParam({ name: 'id', type: 'string', description: 'Serial id' })
  @ApiHeader({ name: 'X-Auth-Token', description: 'Auth token' })
  @ApiQuery({ name: 'year', type: 'number', description: 'Filter by year' })
  @ApiOperation({ summary: 'Get all serials', description: 'Get serial by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Get serial by id' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Serial not found',
  })
  @ApiNotFoundResponse({
    description: 'Serial not found',
    example: {
      message: 'Serial not found!!!',
      status: 404,
      path: '/serial/1',
      timestamp: '2022-01-01T00:00:00.000Z',
    },
  })
  @Get(':id')
  findById(@Param('id') id: string) {
    return { id: id, title: 'The Witcher', genre: 'Action', releaseYear: 2022 };
  }
  @ApiOkResponse({ description: 'Create serial' })
  @ApiOperation({ summary: 'Get all serials', description: 'Get serial by id' })
  @Post()
  create(@Body() dto: CreateSerialDto) {
    return dto;
  }
}
