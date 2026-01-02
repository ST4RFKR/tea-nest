import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  private task = [
    {
      id: 1,
      title: 'Learn NestJS',
      isCompleted: false,
    },
    {
      id: 2,
      title: 'Build API',
      isCompleted: false,
    },
  ];

  findAll() {
    return this.task;
  }

  findById(id: number) {
    const task = this.task.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with id  ${id} not found`);
    }
    return task;
  }
  create(dto: CreateTaskDto) {
    const newTask = {
      id: this.task.length + 1,
      title: dto.title,
      description: dto.description,
      priority: dto.priority,
      tags: dto.tags,
      isCompleted: false,
    };
    this.task.push(newTask);
    return newTask;
  }

  update(id: number, dto: UpdateTaskDto) {
    const task = this.findById(id);
    task.title = dto.title;
    task.isCompleted = dto.isCompleted;
    return task;
  }

  patchUpdate(id: number, dto: Partial<UpdateTaskDto>) {
    const task = this.findById(id);
    Object.assign(task, dto);
    return task;
  }

  delete(id: number) {
    const task = this.findById(id);
    this.task = this.task.filter((task) => task.id !== id);
    return task;
  }
}
