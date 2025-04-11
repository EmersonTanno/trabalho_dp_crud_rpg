import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonagemDto } from './create-personagem.dto';
import { IsArray, IsEnum, IsInt, IsOptional, IsString, Max, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ItemMagico } from 'src/item_magico/entities/item_magico.entity';

export class UpdatePersonagemDto extends PartialType(CreatePersonagemDto) {

    @IsOptional()
    @IsEnum(['Guerreiro', 'Mago', 'Arqueiro', 'Ladino', 'Bardo'])
    class: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ItemMagico)
    itensMagicos?: ItemMagico[];
}
