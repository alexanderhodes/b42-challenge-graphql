import {Test, TestingModule} from '@nestjs/testing';
import {GraphQLModule} from '@nestjs/graphql';
import {MongooseModule} from '@nestjs/mongoose';
import * as request from 'supertest';
import {TodoModule, TodoType} from '../src/todo';

describe('TodosResolver (e2e)', () => {
    let app;
    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                TodoModule,
                GraphQLModule.forRoot({
                    autoSchemaFile: 'test/schema.gql'
                }),
                MongooseModule.forRoot('mongodb://localhost:27018/b42challenge')
            ]
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    const todo: TodoType = {
        id: 1,
        title: 'Learn React',
        completed: false
    };
    const id: number = todo.id;

    const updatedTodo: TodoType = {
        id: 1,
        title: 'Learn GraphQL',
        completed: false
    };

    const createTodo = JSON.stringify(todo).replace(
        /\"([^(\")"]+)\":/g,
        '$1:',
    );

    const createTodoQuery = `
        mutation {
          createTodo (todo: ${createTodo}) { id title completed }
        }
    `;

    it('createTodo', () => {
        sendRequestAndValidate(app.getHttpServer, createTodoQuery, todo);
    });

    it('getTodo', () => {
        const findOneTodoQuery = `findTodoById(id: ${todo.id}) { id title completed }`;
        sendRequestAndValidate(app.getHttpServer, findOneTodoQuery, updatedTodo);
    });

    it('getTodos', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .send({
                operationName: null,
                query: '{ findAll {id title completed} }'
            }).expect(({body}) => {
                const data: TodoType[] = body.data.findAll;
                console.log('data', data);
                const todoResult = data[0];
                expect(data.length).toBeGreaterThan(0);
                expect(todoResult.title).toBe(todo.title);
                expect(todoResult.id).toBe(todo.id + '');
                expect(todoResult.completed).toBe(todo.completed);
            })
            .expect(200);
    });

    it('updateItem', () => {
        const updateTodo = JSON.stringify(updatedTodo).replace(
            /\"([^(\")"]+)\":/g,
            '$1:',
        );

        const updateTodoQuery = `
            mutation {
              updateTodo(id: 1, todo: ${updateTodo}) { id title completed }
            }
        `;

        sendRequestAndValidate(app.getHttpServer, updateTodoQuery, updatedTodo);
    });

    it('deleteTodo', () => {
        const deleteTodoQuery = `
            mutation {
              deleteTodo(id: ${id}) {id title completed}
            }
        `;

        sendRequestAndValidate(app.getHttpServer, deleteTodoQuery, updatedTodo);
    });

});

function sendRequestAndValidate(httpServer: any, query: string, todo: TodoType) {
    return request(httpServer)
        .post('/graphql')
        .send({
            operationName: null,
            query: query
        })
        .expect(({ body }) => {
            const data: TodoType = body.data.deleteTodo;
            expect(data.title).toBe(todo.title);
            expect(data.id).toBe(todo.id + '');
            expect(data.completed).toBe(todo.completed);
        })
        .expect(200);
}
