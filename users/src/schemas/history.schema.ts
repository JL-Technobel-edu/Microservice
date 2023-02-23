import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type HistoryDocument = HydratedDocument<History>;

@Schema({versionKey:false })
export class History {
  @Prop({ required: false })
  userReference: string | null;

  @Prop({ required: true })
  survey: string;

  @Prop({ required: true })
  theme: string;

  @Prop({ required: true })
  question: string;

  @Prop({ required: false })
  answer: string | null;


}

export const HistorySchema = SchemaFactory.createForClass(History);
