import { PartialType } from '@nestjs/mapped-types';
import { CreateItemMagicoDto } from './create-item_magico.dto';

export class UpdateItemMagicoDto extends PartialType(CreateItemMagicoDto) {}
