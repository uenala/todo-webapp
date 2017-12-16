export class Todo {
  id: number;
  description: string;
  completed: boolean = false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
