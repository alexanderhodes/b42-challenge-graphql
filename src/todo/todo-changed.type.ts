import {TodoType} from './todo.type';
import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType('TodoChanged')
export class TodoChangedType {
    @Field()
    operation: 'create' | 'delete';
    @Field()
    todo: TodoType;
}
