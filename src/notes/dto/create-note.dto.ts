import { IsNotEmpty, IsString, IsOptional, MaxLength } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  category?: string;
}