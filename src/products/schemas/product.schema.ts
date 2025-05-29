import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
// Importamos las dependencias necesarias de Mongoose y NestJS
@Schema()
// Definimos el esquema de Mongoose para el modelo Product
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, default: 0 })
  stock: number;

@Prop({ default: false })
  isActive: boolean;
}
// Creamos el esquema de Mongoose a partir de la clase Product
export const ProductSchema = SchemaFactory.createForClass(Product);
// Exportamos el tipo de documento de Mongoose para el modelo Product
export type ProductDocument = HydratedDocument<Product>;