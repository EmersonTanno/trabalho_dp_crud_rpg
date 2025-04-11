import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class ItemMagico 
{
    @Prop({ required: true})
    nome: string;

    @Prop({required: true, enum: ['Arma', 'Armadura', 'Amuleto'] })
    tipoDoItem: string;

    @Prop({ required: true, min: 0, max: 10 })
    forca: number;

    @Prop({ required: true, min: 0, max: 10 })
    defesa: number;
}

export type PersonagemDocument = ItemMagico & Document;
export const ItemMagicoSchema = SchemaFactory.createForClass(ItemMagico);
