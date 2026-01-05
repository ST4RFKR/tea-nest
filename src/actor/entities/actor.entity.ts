import { MovieEntity } from 'src/movie/entities/movie.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'actor' })
export class ActorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  name: string;

  @ManyToMany(() => MovieEntity, (movie) => movie.actors)
  @JoinColumn({ name: 'movie_id' })
  movies: MovieEntity[];

  @CreateDateColumn({
    name: 'created_at',
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updateAt: Date;
}
