import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateItemMagicoDto } from './dto/create-item_magico.dto';
import { UpdateItemMagicoDto } from './dto/update-item_magico.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ItemMagico } from './entities/item_magico.entity';
import { Model } from 'mongoose';
import { ItemMagicoFactory } from './item_magico.factory';

@Injectable()
export class ItemMagicoService {

  constructor(
    @InjectModel(ItemMagico.name)
    private ItemMagicoModel: Model<ItemMagico>
  ) {}
  
  async create(createItemMagicoDto: CreateItemMagicoDto) {
    try
    {
      const itemExistente = await this.ItemMagicoModel.findOne({nome: createItemMagicoDto.nome})
      if(itemExistente)
      {
        throw new Error('Item com mesmo nome já existe');
      }

      const itemMagico = ItemMagicoFactory.create(createItemMagicoDto);
      const novoItemMagico = new this.ItemMagicoModel(itemMagico);
      return await novoItemMagico.save();
    } catch (e)
    {
      throw new BadRequestException(e.message)
    }
  }

  async findAll() {
    try
    {
      const findedItens = await this.ItemMagicoModel.find();
      return findedItens;
    } catch (e)
    {
      throw new InternalServerErrorException('Erro ao buscar itens');
    }
  }

  async findOne(id: string) {
    try
    {
      const findedItem = await this.ItemMagicoModel.findById(id);

      if (findedItem == null) {
        throw new Error(`Item Mágico com ID ${id} não encontrado`);
      }

      return findedItem;
    } catch (e)
    {
      throw new NotFoundException(e.message);
    }
   
  }

  async update(id: string, updateItemMagicoDto: UpdateItemMagicoDto) {
    try
    {
      const findedItem = await this.ItemMagicoModel.findById(id);

      if(!findedItem)
      {
        throw new Error(`Item com ID ${id} não encontrado`);
      }

      if(updateItemMagicoDto.nome == "")
      {
        throw new Error("Itens precisam possuir um nome");
      }

      if(updateItemMagicoDto.tipo != "Amuleto" && updateItemMagicoDto.tipo != "Armadura" && updateItemMagicoDto.tipo != "Arma" && updateItemMagicoDto.tipo != undefined)
      {
        throw new Error(`Item com Tipo ${updateItemMagicoDto.tipo} não corresponde aos tipos existentes`);
      }

      if(updateItemMagicoDto.forca !> 10 || updateItemMagicoDto.defesa !> 10)
      {
        throw new Error("Itens não podem possuir ATAQUE ou DEFESA maiores que 10");
      }

      if(updateItemMagicoDto.forca !< 10 || updateItemMagicoDto.defesa !< 10)
      {
        throw new Error("Itens não podem possuir ATAQUE ou DEFESA menores que 0");
      }

      return await this.ItemMagicoModel.findByIdAndUpdate(id, updateItemMagicoDto, {new: true})
    } catch(e)
    {
      throw new InternalServerErrorException(e.message);
    }
  }

  async remove(id: string) {
    try
    {
      const findedItem = await this.ItemMagicoModel.findById(id);

      if(!findedItem)
      {
        throw new Error(`Item com ID ${id} não encontrado`);
      }

      await this.ItemMagicoModel.findByIdAndDelete(id);

      return `Item ${findedItem.nome} deletado com sucesso`;
    } catch (e)
    {
      throw new NotFoundException(e.message);
    }
  }
}
