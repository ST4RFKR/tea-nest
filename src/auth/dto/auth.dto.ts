import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({
    description: 'JWT access token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImExMDhhODg4LWMyNDktNDNkNS1hMmRkLTNiYjhkN...',
  })
  accessToken: string;
}
