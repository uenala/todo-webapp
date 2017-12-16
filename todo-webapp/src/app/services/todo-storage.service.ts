import {Injectable} from '@angular/core';
import {Todo} from "../model/todo";

@Injectable()
export class TodoStorageService {

  // Fields //
  lastId: number = 0;
  todos: Todo[] = [];
  countOfCompleted: number;


  // Constructor //
  constructor() {
  }

  // Methods //

  // create
  addTodo(todo: Todo): TodoStorageService {
    if (!todo.id) {
      todo.id = ++this.lastId;
    }

    this.todos.push(todo);
    console.log('added Todo id: ' + this.lastId)
    return this;
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
