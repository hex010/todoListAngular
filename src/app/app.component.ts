import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  todoList: Todo[] = [
    new Todo('Task 1', 'This is the description for task 1'),
    new Todo('Task 2', 'This is the description for task 2')
  ];

  deleteTodoItem(todo: Todo): void {
    const index = this.todoList.findIndex(t => t.id === todo.id);
    if (index !== -1) {
      this.todoList.splice(index, 1);
    }
  }
  
  toggleExpand(todo: Todo) {
    todo.isExpanded = !todo.isExpanded;
  }
}
