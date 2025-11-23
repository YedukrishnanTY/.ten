import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ExpenseDocument = HydratedDocument<Expense>;

@Schema({ timestamps: true })
export class Expense {
    @Prop({ required: true })
    category_id: string;

    @Prop({ required: true })
    categoryName: string;

    @Prop({ required: true })
    accountId: string;

    @Prop({ required: true })
    accountName: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    currency: string;

    @Prop({ default: false })
    isIncome: boolean;

    @Prop({ required: true })
    username: string;
}


export const ExpenseSchema = SchemaFactory.createForClass(Expense);
