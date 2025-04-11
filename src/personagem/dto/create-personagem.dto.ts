import { IsString, IsNotEmpty, IsEnum, IsInt, Min, Max, ValidateNested, ArrayMaxSize, IsArray, IsEmpty } from 'class-validator';
import { ItemMagico } from 'src/item_magico/entities/item_magico.entity';

export class CreatePersonagemDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  nomeAventureiro: string;

  @IsEnum(['Guerreiro', 'Mago', 'Arqueiro', 'Ladino', 'Bardo'])
  class: string;

  @IsInt()
  @Min(1)
  level: number;

  @IsInt()
  @Min(0)
  @Max(10)
  forca: number;

  @IsInt()
  @Min(0)
  @Max(10)
  defesa: number;

  @IsEmpty()
  itensMagicos: ItemMagico[];
}
