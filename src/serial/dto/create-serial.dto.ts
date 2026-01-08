import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSerialDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'The title of the movie',
    example: 'The Shawshank Redemption',
  })
  title: string;
  @ApiProperty({
    type: Number,
    required: true,
    description: "The movie's release year",
    example: '2021',
  })
  year: number;

  @ApiPropertyOptional({
    type: String,
    required: false,
    description: 'The movie poster URL',
    example: 'https://example.com/poster.jpg',
  })
  poster?: string;
  @ApiProperty({
    type: [String],
    required: true,
    description: 'The IDs of the actors in the movie',
    example: [
      '123e4567-e89b-12d3-a456-426655440000',
      '123e4567-e89b-12d3-a456-426655440001',
    ],
  })
  actorIds: string[];
}
