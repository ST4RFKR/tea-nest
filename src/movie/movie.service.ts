import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieEntity } from './entities/movie.entity';
import { MovieDto } from './dto/movie.dto';
import { ActorEntity } from 'src/actor/entities/actor.entity';
import { In } from 'typeorm';
import { MoviePosterEntity } from './entities/poster.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    @InjectRepository(MoviePosterEntity)
    private readonly posterRepository: Repository<MoviePosterEntity>,
    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>,
  ) {}
  async fingAll() {
    return await this.movieRepository.find({
      where: {
        isAvailable: true,
      },
      order: {
        createAt: 'DESC',
      },
    });
  }

  async findById(id: string) {
    const movie = await this.movieRepository.findOne({
      where: {
        id,
      },
      relations: {
        actors: true,
      },
    });
    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    return movie;
  }
  async create(dto: MovieDto) {
    const { title, releaseYear, imageUrl, actorIds } = dto;
    const actors = await this.actorRepository.find({
      where: {
        id: In(actorIds),
      },
    });
    if (!actors || !actors.length) {
      throw new NotFoundException('Not all actors found');
    }
    let poster: MoviePosterEntity | null = null;
    if (imageUrl) {
      poster = this.posterRepository.create({ url: imageUrl, name: title });
      await this.posterRepository.save(poster);
    }
    const movie = this.movieRepository.create({
      title,
      poster,
      releaseYear,
      actors,
    });
    return await this.movieRepository.save(movie);
  }

  async update(id: string, dto: MovieDto) {
    const movie = await this.findById(id);
    Object.assign(movie, dto);
    await this.movieRepository.save(movie);
    return true;
  }
  async delete(id: string) {
    const movie = await this.findById(id);
    await this.movieRepository.remove(movie);
    return true;
  }
}
