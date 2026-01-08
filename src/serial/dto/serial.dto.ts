import { ApiProperty } from '@nestjs/swagger';

export class SerialResponse {
  @ApiProperty({
    type: Number,
    description: 'The ID of the serial',
  })
  id: number;
  @ApiProperty({
    type: String,
    description: 'The title of the serial',
  })
  title: string;
}
