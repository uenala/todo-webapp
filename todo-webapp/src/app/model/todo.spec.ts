import { Todo } from './todo';

describe('Todo', () => {
  it('should create an instance', () => {
    expect(new Todo()).toBeTruthy();
  });

  it('should accept initialisation with values in constructor',() => {
    let todo = new Todo({
      description: 'test',
      completed: true
    });
    expect(todo.description).toEqual('test');
    expect(todo.completed).toBeTruthy();
  });


});
