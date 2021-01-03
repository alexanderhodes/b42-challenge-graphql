import {Field, InputType, Int} from '@nestjs/graphql';
import {TodoType} from './todo.type';

@InputType()
export class TodoInput extends TodoType {

    @Field()
    readonly title: string;
    @Field({ defaultValue: false, nullable: true })
    readonly completed: boolean;

}
