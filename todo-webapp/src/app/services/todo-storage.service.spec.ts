import { TestBed, inject } from '@angular/core/testing';
import { TodoStorageService } from './todo-storage.service';
import {Todo} from "../model/todo";

describe('TodoStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoStorageService]
    });
  });

  it('should be created', inject([TodoStorageService], (service: TodoStorageService) => {
    expect(service).toBeTruthy();
  }));


  describe('#getAllTodos()', () => {

    it('should return an empty array by default', inject([TodoStorageService], (service: TodoStorageService) => {
      expect(service.getAllTodos()).toEqual([]);
    }));

    it('should return an array with all todos', inject([TodoStorageService], (service: TodoStorageService) => {
      let todo1 = new Todo({description: 'Hello 1', completed: false});
      let todo2 = new Todo({description: 'Hello 2', completed: true});
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
    }));

  });



  describe('#addTodo(todo)', () => {

    it('should automatically assign an incrementing id', inject([TodoStorageService], (service: TodoStorageService) => {
      let todo1 = new Todo({description: 'Hello 1', completed: false});
      let todo2 = new Todo({description: 'Hello 2', completed: true});
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getTodoById(1)).toEqual(todo1);
      expect(service.getTodoById(2)).toEqual(todo2);
    }));

  });


  describe('#updateTodoById(id, values)', () => {

    it('should return todo with the corresponding id and updated data', inject([TodoStorageService], (service: TodoStorageService) => {
      let todo = new Todo({description: 'Hello 1', completed: false});
      service.addTodo(todo);
      // update
      let updatedTodo = service.updateTodoById(1, {
        description: 'new todo'
      });
      expect(updatedTodo.description).toEqual('new todo');
    }));

    it('should return null if todo is not found', inject([TodoStorageService], (service: TodoStorageService) => {
      let todo = new Todo({description: 'Hello 1', completed: false});
      service.addTodo(todo);
      // update
      let updatedTodo = service.updateTodoById(2, {
        description: 'new todo'
      });
      expect(updatedTodo).toEqual(null);
    }));

  });


  describe('#toggleTodoCompleted(todo)', () => {

    it('should return the updated todo with inverse complete status', inject([TodoStorageService], (service: TodoStorageService) => {
      let todo = new Todo({description: 'Hello 1', completed: false});
      service.addTodo(todo);
      // first toggle
      let updatedTodo = service.toggleTodoCompleted(todo);
      expect(updatedTodo.completed).toEqual(true);
      // second toggle
      service.toggleTodoCompleted(todo);
      expect(updatedTodo.completed).toEqual(false);
    }));

  });

});
