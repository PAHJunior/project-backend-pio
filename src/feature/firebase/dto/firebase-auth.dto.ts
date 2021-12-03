import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FirebaseAuthDto {
  @ApiProperty({
    required: true,
    type: String,
    description: 'Email',
  })
  @IsString()
  @IsNotEmpty()
  public email: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'Password',
  })
  @IsString()
  @IsNotEmpty()
  public password: string;
}
