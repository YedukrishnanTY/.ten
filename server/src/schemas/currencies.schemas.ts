import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Currencies>;

@Schema({ timestamps: true })
export class Currencies {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  numeric: string;

  @Prop({ required: true })
  minorUnits: number;

}

export const CurrenciesSchema = SchemaFactory.createForClass(Currencies);
