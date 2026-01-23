import { Injectable } from '@nestjs/common';
import e from 'express';

@Injectable()
export class UserGraphService {
  private users = [
    { id: 1, name: 'Alice', email: 's9g9Z@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }
}
