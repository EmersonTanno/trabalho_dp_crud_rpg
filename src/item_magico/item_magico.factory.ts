import { CreateItemMagicoDto } from "./dto/create-item_magico.dto";
import { ItemMagico } from "./entities/item_magico.entity";

export class ItemMagicoFactory {
  static create(dto: CreateItemMagicoDto): ItemMagico {
    this.validarCamposGerais(dto);

    switch (dto.tipo) {
      case "Amuleto":
        this.validarAmuleto(dto);
        break;
      case "Arma":
        this.validarArma(dto);
        break;
      case "Armadura":
        this.validarArmadura(dto);
        break;
      default:
        throw new Error(`Tipo de item mágico inválido: ${dto.tipo}`);
    }

    const itemMagico = new ItemMagico();
    itemMagico.nome = dto.nome;
    itemMagico.tipoDoItem = dto.tipo;
    itemMagico.forca = dto.tipo === "Armadura" ? 0 : dto.forca;
    itemMagico.defesa = dto.tipo === "Arma" ? 0 : dto.defesa;

    return itemMagico;
  }

  private static validarCamposGerais(dto: CreateItemMagicoDto) {
    if (dto.forca > 10) {
      throw new Error('A FORÇA de um Item Mágico pode ser no máximo 10');
    }
    if (dto.defesa > 10) {
      throw new Error('A DEFESA de um Item Mágico pode ser no máximo 10');
    }
  }

  private static validarAmuleto(dto: CreateItemMagicoDto) {
    if (dto.forca < 0 || dto.defesa < 0) {
      throw new Error('A FORÇA e DEFESA de um AMULETO não podem ser menores que 0');
    }
    if (dto.forca === 0 && dto.defesa === 0) {
      throw new Error('A FORÇA e DEFESA de um AMULETO não podem ser ambas 0');
    }
  }

  private static validarArma(dto: CreateItemMagicoDto) {
    if (dto.forca <= 0) {
      throw new Error('Uma ARMA deve possuir FORÇA maior que 0');
    }
    if (dto.defesa !== 0) {
      throw new Error('Uma ARMA não pode possuir DEFESA diferente de 0');
    }
  }

  private static validarArmadura(dto: CreateItemMagicoDto) {
    if (dto.defesa <= 0) {
      throw new Error('Uma ARMADURA deve possuir DEFESA maior que 0');
    }
    if (dto.forca !== 0) {
      throw new Error('Uma ARMADURA não pode possuir FORÇA diferente de 0');
    }
  }
}
