import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { PersonagemService } from './personagem.service';
import { CreatePersonagemDto } from './dto/create-personagem.dto';
import { UpdatePersonagemDto } from './dto/update-personagem.dto';

@Controller('personagem')
export class PersonagemController {
  constructor(private readonly personagemService: PersonagemService) {}

  @Post()
  create(@Body() createPersonagemDto: CreatePersonagemDto) {
    return this.personagemService.create(createPersonagemDto);
  }

  @Get()
  findAll() {
    return this.personagemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personagemService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePersonagemDto: UpdatePersonagemDto) {
    return this.personagemService.update(id, updatePersonagemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personagemService.remove(id);
  }

  @Put('newAdventurerName/:id')
  updateAdventurerName(@Param('id') id: string, @Body() body: {newName: string}){
    return this.personagemService.updateAdventurerName(id, body.newName);
  }

  @Put('addItem/:id')
  addItemToCharacter(@Param('id') id: string, @Body() body: {itemId: string}){
    return this.personagemService.addItemMagicoAoPersonagem(id, body.itemId);
  }

  @Put('removeItem/:id')
  removeItemFromCharacter(@Param('id') id: string, @Body() body: {itemId:string}){
    return this.personagemService.removeItemMagicoAoPersonagem(id, body.itemId);
  }

  @Get('amuleto/:id')
  getAmuletoFromCharacter(@Param('id') id: string) {
    return this.personagemService.findAmuletoDoPersonagem(id);
  }

  @Get('characterItens/:id')
  getItensFromCharacter(@Param('id') id: string) {
    return this.personagemService.getItensPorPersonagem(id);
  }
}
