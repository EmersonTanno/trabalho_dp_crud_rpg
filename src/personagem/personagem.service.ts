import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePersonagemDto } from './dto/create-personagem.dto';
import { UpdatePersonagemDto } from './dto/update-personagem.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Personagem } from './entities/personagem.entity';
import { Model } from 'mongoose';
import { PersonagemFactory } from './personagem.factory';
import { ItemMagico } from 'src/item_magico/entities/item_magico.entity';

@Injectable()
export class PersonagemService {

  constructor(
    @InjectModel(Personagem.name) 
    private personagemModel: Model<Personagem>,

    @InjectModel(ItemMagico.name)
    private itemMagicoModel: Model<ItemMagico>
  ) {}

  
  async create(createPersonagemDto: CreatePersonagemDto) {
    try
    {
      const personagemExistente = await this.personagemModel.findOne({nome: createPersonagemDto.nome});
      if(personagemExistente)
      {
        throw new Error(`Já existe um personagem com o nome ${createPersonagemDto.nome}`);
      }
      const personagem = PersonagemFactory.create(createPersonagemDto);
      const novoPersonagem = new this.personagemModel(personagem)
      return await novoPersonagem.save();
    } catch (e)
    {
      throw new BadRequestException(e.message)
    }
  }

  async findAll() {
    try {
      const personagens = await this.personagemModel.find();
  
      return personagens.map(personagem => {
        const bonusForca = personagem.itensMagicos.reduce((soma, item) => soma + (item.forca || 0), 0);
        const bonusDefesa = personagem.itensMagicos.reduce((soma, item) => soma + (item.defesa || 0), 0);
  
        return {
          ...personagem.toObject(),
          forcaTotal: personagem.forca + bonusForca,
          defesaTotal: personagem.defesa + bonusDefesa,
        };
      });
  
    } catch (e) {
      throw new InternalServerErrorException('Erro ao buscar personagem');
    }
  }

  async findOne(id: string) {
    try {
      const personagem = await this.personagemModel.findById(id);
  
      if (!personagem) {
        throw new Error(`Personagem com ID ${id} não encontrado`);
      }

      const bonusForca = personagem.itensMagicos.reduce((soma, item) => soma + (item.forca || 0), 0);
      const bonusDefesa = personagem.itensMagicos.reduce((soma, item) => soma + (item.defesa || 0), 0);
  
      return  {
        ...personagem.toObject(),
        forcaTotal: personagem.forca + bonusForca,
        defesaTotal: personagem.defesa + bonusDefesa,
      }
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  async update(id: string, updatePersonagemDto: UpdatePersonagemDto) {
    try
    {
      const personagem = await this.personagemModel.findById(id);

      if (!personagem) {
        throw new Error(`Personagem com ID ${id} não encontrado`);
      }

      if(updatePersonagemDto.class != "Guerreiro" && updatePersonagemDto.class != "Mago" && updatePersonagemDto.class != "Ladino" && updatePersonagemDto.class != "Bardo" && updatePersonagemDto.class != "Arqueiro" && updatePersonagemDto.class != undefined)
      {
        throw new Error(`Classe ${updatePersonagemDto.class} não corresponde a uma classe válida`);
      }

      if(updatePersonagemDto.level !<= 0)
      {
        throw new Error(`Nível não pode ser 0 ou menor`);
      }

      if(updatePersonagemDto.forca && !updatePersonagemDto.defesa)
      {
        if(updatePersonagemDto.forca < 0)
        {
          throw new Error('Força não deve ser menor que 0');
        }

        if(personagem.defesa + updatePersonagemDto.forca != 10)
        {
          throw new Error('Força e Defesa somados não devem ser maiores nem menores que 10');
        }
      }

      if(updatePersonagemDto.defesa && !updatePersonagemDto.forca)
      {
        if(updatePersonagemDto.defesa < 0)
        {
          throw new Error('Força não deve ser menor que 0');
        }
        if(personagem.forca + updatePersonagemDto.defesa != 10)
        {
          throw new Error('Força e Defesa somados não devem ser maiores nem menores que 10');
        }
      }

      if(updatePersonagemDto.forca && updatePersonagemDto.defesa)
      {
        if(updatePersonagemDto.forca + updatePersonagemDto.defesa != 10)
        {
          throw new Error('Força e Defesa somados não devem ser maiores nem menores que 10');
        }
      }

      return await this.personagemModel.findByIdAndUpdate(id, updatePersonagemDto, {new: true});
    } catch(e)
    {
      throw new InternalServerErrorException(e.message);
    }

  }

  async remove(id: string) {
    try
    {
      const  personagemRemovido  = await this.personagemModel.findById(id);
      
      if(!personagemRemovido)
      {
        throw new NotFoundException(`Personagem para ser excluído com o ID ${id} não foi encontrado`);
      }

      await this.personagemModel.findByIdAndDelete(id)

      return `Personagem ${personagemRemovido.nome} deletado com sucesso`;
    } catch(e)
    {
      throw new InternalServerErrorException(e.message);
    }
  }

  async updateAdventurerName(id: string, newName: string) {
    try
    {
      const personagem = await this.personagemModel.findById(id);

      if (!personagem) {
        throw new Error(`Personagem com ID ${id} não encontrado`);
      }

      if(!newName)
      {
        throw new Error("O Nome de Aventureiro não pode estar vazio");
      }

      return await this.personagemModel.findByIdAndUpdate(
        id,
        { nomeAventureiro: newName },
        { new: true }
      );
    } catch(e)
    {
      throw new InternalServerErrorException(e.message);
    }
  }

  async addItemMagicoAoPersonagem(id: string, itemId: string) {
    try
    {
      const personagem = await this.personagemModel.findById(id);

      if (!personagem) 
      {
        throw new Error(`Personagem com ID ${id} não encontrado`);
      }

      const item = await this.itemMagicoModel.findById(itemId);
      if (!item) 
      {
        throw new Error(`Item Mágico com ID ${itemId} não encontrado`);
      } 

      if (item.tipoDoItem === "Amuleto") 
      {
        const jaPossuiAmuleto = personagem.itensMagicos.some((i: any) => i.tipoDoItem === "Amuleto");
      
        if (jaPossuiAmuleto) 
        {
          throw new Error(`O personagem já possui um Amuleto. Não é possível equipar outro.`);
        }
      }

      const jaPossuiItemIgual = personagem.itensMagicos.some((i: any) => i.id?.toString() === item.id.toString());

      if(jaPossuiItemIgual)
      {
        throw new Error(`O personagem já possui um ${item.nome.toUpperCase()}. Não é possível equipar outro igual.`);
      }

      return await this.personagemModel.findByIdAndUpdate(
        id,
        { $push: {itensMagicos: item.toObject()} },
        { new: true }
      );
    } catch (e)
    {
      throw new InternalServerErrorException(e.message);
    }
  }

  async removeItemMagicoAoPersonagem(id: string, itemId: string) {
    try
    {
      const personagem = await this.personagemModel.findById(id);

      if (!personagem) 
      {
        throw new Error(`Personagem com ID ${id} não encontrado`);
      }
      const itemExiste = personagem.itensMagicos.some((item: any) => item._id?.toString() === itemId);
    
      if (!itemExiste) {
        throw new Error(`O item com ID ${itemId} não está equipado nesse personagem`);
      }
    
      return await this.personagemModel.findByIdAndUpdate(
        id,
        {
          $pull: { itensMagicos: { _id: itemId } }
        },
        { new: true }
      );
    } catch (e)
    {
      throw new InternalServerErrorException(e.message);
    }
  }

  async findAmuletoDoPersonagem(id: string) {
    try
    {
      const personagem = await this.personagemModel.findById(id);

      if (!personagem) 
      {
        throw new Error(`Personagem com ID ${id} não encontrado`);
      }

      const amuletoExiste = personagem.itensMagicos.find((item: any) => item.tipoDoItem === "Amuleto");

      if(!amuletoExiste)
      {
        throw new Error(`${personagem.nomeAventureiro} não possui nenhum amuleto equipado`);
      }

      return amuletoExiste;

    } catch (e)
    {
      throw new NotFoundException(e.message);
    }
  }

  async getItensPorPersonagem(id: string){
    try
    {
      const personagem = await this.personagemModel.findById(id);

      if(!personagem)
      {
        throw new Error(`Personagem com ID ${id} não encontrado`);
      }

      const listaItens = personagem.itensMagicos;

      if(listaItens.length == 0){
        return `O personagem ${personagem.nome} não possui Itens Mágicos`
      }

      return listaItens;

    } catch (e)
    {
      throw new InternalServerErrorException(e.message);
    }
  }

}
