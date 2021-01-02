import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {GraphQLModule} from '@nestjs/graphql';
import {MongooseModule} from '@nestjs/mongoose';
import {TodoModule} from './todo';

@Module({
    imports: [
        TodoModule,
        GraphQLModule.forRoot({
            debug: false,
            playground: true,
            autoSchemaFile: 'src/schema.gql'
        }),
        MongooseModule.forRoot('mongodb://localhost:27018/b42challenge'),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
