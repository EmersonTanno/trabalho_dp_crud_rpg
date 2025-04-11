import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemMagicoService } from './item_magico.service';
import { CreateItemMagicoDto } from './dto/create-item_magico.dto';
import { UpdateItemMagicoDto } from './dto/update-item_magico.dto';

@Controller('item-magico')
export class ItemMagicoController {
  constructor(private readonly itemMagicoService: ItemMagicoService) {}

  @Post()
  create(@Body() createItemMagicoDto: CreateItemMagicoDto) {
    return this.itemMagicoService.create(createItemMagicoDto);
  }

  @Get()
  findAll() {
    return this.itemMagicoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemMagicoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemMagicoDto: UpdateItemMagicoDto) {
    return this.itemMagicoService.update(+id, updateItemMagicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemMagicoService.remove(+id);
  }
}
