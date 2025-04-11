import { Module } from '@nestjs/common';
import { PersonagemService } from './personagem.service';
import { PersonagemController } from './personagem.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Personagem, PersonagemSchema } from './entities/personagem.entity';
import { ItemMagicoModule } from 'src/item_magico/item_magico.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Personagem.name, schema: PersonagemSchema}]),
    ItemMagicoModule
  ],
  controllers: [PersonagemController],
  providers: [PersonagemService],
})
export class PersonagemModule {}
