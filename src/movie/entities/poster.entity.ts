import { MovieEntity } from 'src/movie/entities/movie.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'moveie_poster' })
export class MoviePosterEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    type: 'varchar',
  })
  url: string;

  @Column({
    type: 'varchar',
  })
  name: string;

  @OneToOne(() => MovieEntity, (movie) => movie.poster)
  @JoinColumn({ name: 'movie_id' })
  movie: MovieEntity;

  @CreateDateColumn({
    name: 'created_at',
  })
  createAt: Date;
}
