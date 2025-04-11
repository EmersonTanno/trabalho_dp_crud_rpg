import { IsString, IsEnum, IsInt, Min, Max, IsOptional } from 'class-validator';

export class CreateItemMagicoDto {
  @IsString()
  nome: string;

  @IsEnum(['Arma', 'Armadura', 'Amuleto'])
  tipo: string;

  @IsInt()
  @Min(0)
  @Max(10)
  @IsOptional()
  forca: number;

  @IsInt()
  @Min(0)
  @Max(10)
  @IsOptional()
  defesa: number;
}