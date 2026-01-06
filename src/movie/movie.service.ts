import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MovieDto } from './dto/movie.dto';
import { Movie } from 'prisma/generated/prisma/client';

@Injectable()
export class MovieService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll() {
    const movies = await this.prismaService.movie.findMany({
      where: {
        isAvailable: true,
      },
      orderBy: {
        releaseYear: 'desc',
      },
      include: {
        actors: true,
        reviews: true,
      },
    });
    return movies;
  }
  async findById(id: string) {
    const movie = await this.prismaService.movie.findUnique({
      where: {
        id,
      },
      include: {
        actors: true,
        reviews: true,
      },
    });

    if (!movie || !movie.isAvailable) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }

    return movie;
  }

  async create(dto: MovieDto): Promise<Movie> {
    const { title, releaseYear, isAvailable, actorIds, imageUrl } = dto;
    const actors = await this.prismaService.actor.findMany({
      where: {
        id: { in: actorIds },
      },
    });

    if (!actors || !actors.length) {
      throw new NotFoundException(`Actors with ids not found`);
    }

    return this.prismaService.movie.create({
      data: {
        title,
        releaseYear,
        isAvailable,
        actors: {
          connect: actorIds.map((id) => ({ id })),
        },
      },
    });
  }

  async update(id: string, dto: MovieDto) {
    const movie = await this.findById(id);

    const actors = await this.prismaService.actor.findMany({
      where: {
        id: { in: dto.actorIds },
      },
    });

    if (!actors || !actors.length) {
      throw new NotFoundException(`Actors with ids not found`);
    }
    await this.prismaService.movie.update({
      where: { id: movie.id },
      data: {
        title: dto.title,
        releaseYear: dto.releaseYear,
        actors: {
          connect: dto.actorIds.map((id) => ({ id })),
        },
      },
    });
    return true;
  }
  async delete(id: string) {
    const movie = await this.findById(id);
    await this.prismaService.movie.delete({ where: { id } });
    return true;
  }
}
