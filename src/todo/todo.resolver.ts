import {Resolver, Query, Mutation, Args} from '@nestjs/graphql';
import {TodoService} from './todo.service';
import {TodoType} from './todo.type';
import {TodoInput} from './todo.input';
import {HttpException, HttpStatus, Logger} from '@nestjs/common';

@Resolver(() => TodoType)
export class TodoResolver {

    private readonly logger = new Logger(TodoResolver.name);

    constructor(private todoService: TodoService) {}

    @Query(() => [TodoType])
    async allTodos(): Promise<TodoType[]> {
        this.logger.log('allTodos');
        return await this.todoService.findAll();
    }

    @Query(() => TodoType)
    async todoById(@Args('id') id: number): Promise<TodoType> {
        this.logger.log(`todoById ${id}`)
        const todo = await this.todoService.findById(id);
        if (todo) {
            this.logger.log(JSON.stringify(todo));
            return todo;
        }
        throw new HttpException(`todo with id ${id} not found`, HttpStatus.NOT_FOUND);
    }

    @Mutation(() => TodoType)
    async createTodo(@Args('todo') todo: TodoInput): Promise<TodoType> {
        this.logger.log('create todo');
        this.logger.log(JSON.stringify(todo));
        return await this.todoService.create(todo);
    }

    @Mutation(() => TodoType)
    async updateTodo(@Args('id') id: number, @Args('todo') todo: TodoInput): Promise<TodoType> {
        this.logger.log(`update todo ${id}`);
        const updatedTodo = await this.todoService.update(id, todo);
        if (updatedTodo) {
            this.logger.log(JSON.stringify(updatedTodo));
            return updatedTodo;
        }
        this.logger.error(`update failed for todo with id ${todo.id} and title ${todo.title}`);
        throw new HttpException(`update failed for todo with id ${todo.id} and title ${todo.title}`, HttpStatus.BAD_REQUEST);
    }

    @Mutation(() => TodoType)
    async deleteTodo(@Args('id') id: number): Promise<TodoType> {
        this.logger.log(`delete todo ${id}`);
        const deletedTodo = await this.todoService.delete(id);
        if (deletedTodo) {
            this.logger.log(JSON.stringify(deletedTodo));
            return deletedTodo;
        }
        this.logger.error(`delete failed for todo with id ${id}`);
        throw new HttpException(`delete failed for todo with id ${id}`, HttpStatus.BAD_REQUEST);
    }

}
