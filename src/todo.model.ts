import {Document} from 'mongoose'
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

@Schema({
    collection: 'Todo'
})
export class TodoModel extends Document {

    @Prop({ unique: true, type: Number })
    id: number;
    @Prop({ unique: true })
    title: string;
    @Prop({ default: false })
    completed: boolean;

}

export const TodoSchema = SchemaFactory.createForClass(TodoModel);
