import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {TodoModel, TodoSchema} from './todo.model';
import {TodoService} from './todo.service';
import {TodoResolver} from './todo.resolver';

const providers = [
    TodoResolver,
    TodoService
]

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: TodoModel.name, schema: TodoSchema }
        ])
    ],
    exports: [
        ...providers
    ],
    providers: [
        ...providers
    ]
})
export class TodoModule {

}
