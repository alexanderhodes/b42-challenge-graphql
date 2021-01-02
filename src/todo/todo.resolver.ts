import {Resolver, Query, Mutation, Args} from '@nestjs/graphql';
import {TodoService} from './todo.service';
import {TodoType} from './todo.type';
import {TodoInput} from './todo.input';
import {HttpException, HttpStatus} from '@nestjs/common';

@Resolver(() => TodoType)
export class TodoResolver {

    constructor(private todoService: TodoService) {
    }

    @Query(() => [TodoType])
    async allTodos(): Promise<TodoType[]> {
        console.log('findAll');
        return await this.todoService.findAll();
    }

    @Query(() => TodoType)
    async todoById(@Args('id') id: number): Promise<TodoType> {
        console.log('todoById', id);
        const todo = await this.todoService.findById(id);
        if (todo) {
            return todo;
        }
        throw new HttpException(`todo with id ${id} not found`, HttpStatus.NOT_FOUND);
    }

    @Mutation(() => TodoType)
    async createTodo(@Args('todo') todo: TodoInput): Promise<TodoType> {
        console.log('create todo');
        return await this.todoService.create(todo);
    }

    @Mutation(() => TodoType)
    async updateTodo(@Args('id') id: number, @Args('todo') todo: TodoInput): Promise<TodoType> {
        console.log('update todo', id);
        const updatedTodo = await this.todoService.update(id, todo);
        if (updatedTodo) {
            return updatedTodo;
        }
        throw new HttpException(`update failed for todo with id ${todo.id} and title ${todo.title}`, HttpStatus.BAD_REQUEST);
    }

    @Mutation(() => TodoType)
    async deleteTodo(@Args('id') id: number): Promise<TodoType> {
        console.log('delete todo', id);
        const deletedTodo = await this.todoService.delete(id);
        if (deletedTodo) {
            return deletedTodo;
        }
        throw new HttpException(`update failed for todo with id ${id}`, HttpStatus.BAD_REQUEST);
    }

}
