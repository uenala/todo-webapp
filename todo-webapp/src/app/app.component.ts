import { Component } from '@angular/core';
import { Todo } from "./model/todo";
import { TodoStorageService} from "./services/todo-storage.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoStorageService]
})
export class AppComponent {

  // Fields //
  title = '//TODO: get it done';
  newTodo: Todo = new Todo();
  private todoStorageService: TodoStorageService;

  // Constructor //
  constructor(todoStorageService: TodoStorageService) {
    this.todoStorageService = todoStorageService;
  }

  // Methods //
  // "Controller" for TodoStorageService //
  addTodo() {
    this.todoStorageService.addTodo(this.newTodo);
    this.newTodo = new Todo(); // re-initialize after adding
  }

  toggleTodoCompleted(todo) {
    this.todoStorageService.toggleTodoCompleted(todo);
  }

  get todos() {
    return this.todoStorageService.getAllTodos();
  }

  get completed() {
    return this.todoStorageService.countOfCompleted;
  }

}
