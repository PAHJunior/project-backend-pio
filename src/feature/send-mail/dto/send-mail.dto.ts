import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SendMailDto {
  @ApiProperty({
    required: true,
    type: String,
    description: 'Email of destination',
  })
  @IsString()
  @IsNotEmpty()
  public destination: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'Name of destination',
  })
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'phone number',
  })
  @IsString()
  @IsNotEmpty()
  public phoneNumber: string;

  @ApiProperty({
    required: false,
    type: String,
    description: 'observations',
  })
  @IsString()
  @IsOptional()
  public observations?: string;
}
