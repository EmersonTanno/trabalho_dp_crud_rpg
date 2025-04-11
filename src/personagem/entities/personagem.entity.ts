import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ItemMagico } from "src/item_magico/entities/item_magico.entity";

@Schema()
export class Personagem 
{
    @Prop({ required: true })
    nome: string;

    @Prop({ required: true })
    nomeAventureiro: string;

    @Prop({ required: true, enum:['Guerreiro', 'Mago', 'Arqueiro', 'Ladino', 'Bardo'] })
    class: string;

    @Prop({ required: true, min: 1, default: 1 })
    level: number;

    @Prop({ required: true, min: 0, max: 10 })
    forca: number;

    @Prop({ required: true, min: 0, max: 10 })
    defesa: number;

    @Prop({ type: [ItemMagico], default: [] })
    itensMagicos: ItemMagico[];
    
}

export type PersonagemDocument = Personagem & Document;
export const PersonagemSchema = SchemaFactory.createForClass(Personagem);
