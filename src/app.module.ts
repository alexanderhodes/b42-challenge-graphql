import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {GraphQLModule} from '@nestjs/graphql';
import {MongooseModule} from '@nestjs/mongoose';
import {TodoModel, TodoSchema} from './todo.model';
import {TodoService} from './todo.service';
import {TodoResolver} from './todo.resolver';

@Module({
    imports: [
        GraphQLModule.forRoot({
            debug: false,
            playground: true,
            autoSchemaFile: 'src/schema.gql'
        }),
        MongooseModule.forRoot('mongodb://localhost:27018/b42challenge'),
        MongooseModule.forFeature([
            { name: TodoModel.name, schema: TodoSchema }
        ])
    ],
    controllers: [AppController],
    providers: [AppService,TodoService,TodoResolver],
})
export class AppModule {
}
