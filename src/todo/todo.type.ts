import {Field, ID, ObjectType} from '@nestjs/graphql';

@ObjectType('Todo')
export class TodoType {
    @Field(() => ID)
    id: number;
    @Field({nullable: false})
    title: string;
    @Field({defaultValue: false})
    completed: boolean;
}
