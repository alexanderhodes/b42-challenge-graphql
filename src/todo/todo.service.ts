import {Model} from "mongoose";
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {TodoModel} from './todo.model';
import {TodoType} from './todo.type';

@Injectable()
export class TodoService {

    constructor(
        @InjectModel(TodoModel.name) private todoModel: Model<TodoModel>
    ) {}

    async findAll(): Promise<TodoType[]> {
        return await this.todoModel.find().exec();
    }

    async findById(id: number): Promise<TodoType> {
        return this.todoModel.findOne({ "id": id });
    }

    async create(todo: TodoType): Promise<TodoType> {
        const latestTodos = await this.todoModel.find().sort({_id: -1}).limit(1).exec();
        todo.id = latestTodos ? latestTodos[0].id + 1 : 1;
        const createdTodo = new this.todoModel(todo);
        return await createdTodo.save();
    }

    async update(id: number, todo: TodoType): Promise<TodoType> {
        const response = await this.todoModel.updateOne({"id": id}, todo).exec();
        return response.nModified === 1 || response.n === 1 ? todo : null;
    }

    async delete(id: number): Promise<TodoType> {
        const found = await this.todoModel.findOne({"id": id});
        const response = await this.todoModel.deleteOne({"id": id}).exec();
        return response.deletedCount === 1 ? found : null;
    }

}
