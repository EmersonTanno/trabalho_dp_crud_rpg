import { Module } from '@nestjs/common';
import { ItemMagicoService } from './item_magico.service';
import { ItemMagicoController } from './item_magico.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemMagico, ItemMagicoSchema } from './entities/item_magico.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ItemMagico.name, schema: ItemMagicoSchema}])
  ],
  controllers: [ItemMagicoController],
  providers: [ItemMagicoService],
  exports: [MongooseModule],
})
export class ItemMagicoModule {}
