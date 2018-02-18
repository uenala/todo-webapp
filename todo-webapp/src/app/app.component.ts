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
  hideCompleted : boolean = false;
  private todoStorageService: TodoStorageService;

  // Constructor //
  constructor(todoStorageService: TodoStorageService) {
    this.todoStorageService = todoStorageService;
  }

  // Methods //
  // "Controller" for TodoStorageService //
  addTodo(): void {
    this.todoStorageService.addTodo(this.newTodo);
    this.newTodo = new Todo(); // re-initialize after adding
  }

  toggleTodoCompleted(todo: Todo): void {
    this.todoStorageService.toggleTodoCompleted(todo);
  }

  get todos(): Todo[]{
    if(this.hideCompleted) {
      return this.todoStorageService.getUncompletedTodos()
    } else {
      return this.todoStorageService.getAllTodos();
    }
  }

  get numberOfTodos(): number {
    return this.todoStorageService.getAllTodos().length;
  }

  get numberOfcompletedTodos(): number{
    return this.todoStorageService.countOfCompleted;
  }

  toggleHideCompleted(): void {
    this.hideCompleted = !this.hideCompleted;
  }

}
