import {Injectable} from '@angular/core';
import {Todo} from "../model/todo";
import {isNullOrUndefined} from "util";


// this service simulates a persistence layer. offers methods for getting, creating and updating todos.
@Injectable()
export class TodoStorageService {

  // Fields //
  lastId: number = 0; // used to simulate id sequence increase of a db
  todos: Todo[] = [];
  countOfCompleted: number;


  // Constructor //
  constructor() {
  }

  // Methods //

  // create
  addTodo(todo: Todo): void {
    if (isNullOrUndefined(todo.description) || todo.description.trim() === '') {
      console.log('prevented add of empty Todo')
      return;
    }
    if (!todo.id) {
      todo.id = ++this.lastId;
    }

    this.todos.push(todo);
    console.log('added Todo id= ' + todo.id + ' : ' + todo.description)
    return;
  }

  // getById
  getTodoById(id: number): Todo {
    return this.todos
      .filter(todo => todo.id === id)
      .pop();
  }

  // getAll
  getAllTodos(): Todo[] {
    return this.todos;
  }


  // update
  updateTodoById(id: number, values: Object = {}): Todo {
    let todo = this.getTodoById(id);

    if (!todo) {
      return null;
    }

    Object.assign(todo, values);
    return todo;
  }


  // toggle completed
  toggleTodoCompleted(todo: Todo): Todo {
    let updatedTodo = this.updateTodoById(todo.id, {
      completed: !todo.completed
    });
    this.updateCountOfCompleted();
    return updatedTodo;
  }

  // update count of completed
  updateCountOfCompleted(): void {
    this.countOfCompleted = this.todos
      .filter(todo => todo.completed)
      .length;
  }


}
