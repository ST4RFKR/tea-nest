import { Injectable } from '@nestjs/common';
import { Review } from 'prisma/generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateReviewDto): Promise<Review> {
    const { text, rating, movieId } = dto;

    return this.prismaService.review.create({
      data: { text, rating, movie: { connect: { id: movieId } } },
    });
  }
}
