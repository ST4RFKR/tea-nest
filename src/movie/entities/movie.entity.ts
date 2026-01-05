import { ActorEntity } from 'src/actor/entities/actor.entity';
import { ReviewEntity } from 'src/review/entities/review.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MoviePosterEntity } from './poster.entity';

export enum Genre {
  Action = 'action',
  Comedy = 'comedy',
  Drama = 'drama',
  Horror = 'horror',
  Romance = 'romance',
  Thriller = 'thriller',
}

@Entity({ name: 'movies' })
export class MovieEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    name: 'release_year',
    type: 'int',
    unsigned: true,
  })
  releaseYear: number;
  @Column({
    name: 'release_date',
    type: 'date',
    nullable: true,
    default: null,
  })
  releaseDate: string;

  @Column({
    type: 'decimal',
    precision: 3,
    scale: 1,
    default: 0,
  })
  rating: number;

  @Column({ name: 'poster_id', type: 'uuid', nullable: true, default: null })
  posterId: string;

  @OneToOne(() => MoviePosterEntity, (poster) => poster.movie, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'poster_id' })
  poster: MoviePosterEntity | null;

  @OneToMany(() => ReviewEntity, (review) => review.movie)
  reviews: ReviewEntity[];

  @ManyToMany(() => ActorEntity, (actor) => actor.movies)
  @JoinTable({
    name: 'movie_actors',
    joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'actor_id', referencedColumnName: 'id' },
  })
  actors: ActorEntity[];

  @Column({
    type: 'enum',
    nullable: true,
    default: null,
    enum: Genre,
  })
  genre: Genre;
  @Column({ name: 'is_available', type: 'boolean', default: false })
  isAvailable: boolean;

  @CreateDateColumn({
    name: 'created_at',
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updateAt: Date;
}
