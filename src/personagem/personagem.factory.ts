import { CreatePersonagemDto } from "./dto/create-personagem.dto";
import { Personagem } from "./entities/personagem.entity";


export class PersonagemFactory {
  static create(dto: CreatePersonagemDto): Personagem {
    if (dto.forca + dto.defesa !== 10) {
        throw new Error('A soma de FORÇA e DEFESA deve ser igual a 10');
    }

    if (dto.forca < 0 || dto.defesa < 0)
    {
      throw new Error('O personagem não pode ter valores de FORÇA ou DEFESA negativos');
    }

    if(dto.level <= 0)
    {
      throw new Error('O personagem não pode ter o LEVEL menor ou igual a 0');
    }

    if (dto.itensMagicos && dto.itensMagicos.length > 0) {
        throw new Error('O personagem não pode ter itens mágicos ao ser criado');
    }

    const personagem = new Personagem();
    personagem.nome = dto.nome;
    personagem.nomeAventureiro = dto.nomeAventureiro;
    personagem.class = dto.class;
    personagem.level = dto.level ?? 1;
    personagem.forca = dto.forca;
    personagem.defesa = dto.defesa;
    personagem.itensMagicos = [];

    return personagem;
  }
}
