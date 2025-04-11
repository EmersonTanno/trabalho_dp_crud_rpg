import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonagemModule } from './personagem/personagem.module';
import { ItemMagicoModule } from './item_magico/item_magico.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/rpg'), PersonagemModule, ItemMagicoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
