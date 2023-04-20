import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Todo } from 'src/models/todo.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DescriptionEditPopUpDialogComponent } from './description-edit-pop-up-dialog/description-edit-pop-up-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {  
  constructor(private dialogRef : MatDialog){}

  todoList: Todo[] = [
    new Todo('Task 1', 'This is the description for task 1'),
    new Todo('Task 2', 'This is the description for task 2')
  ];

  addTodoItem(newTodoForm : NgForm) {
    if(newTodoForm.valid){
      const newTodo = new Todo(newTodoForm.value.todoHeader, newTodoForm.value.todoDescription);
      this.todoList.push(newTodo);
      newTodoForm.resetForm(); //skirtumas nuo .reset() tame, kad .resetForm() dar pakeicia subbmited i false, todel nerodys error messages po submito sekmingo
    }
  }


  deleteTodoItem(todo: Todo): void {
    const index = this.todoList.findIndex(t => t.id === todo.id);
    if (index !== -1) {
      this.todoList.splice(index, 1);
    }
  }
  
  toggleExpand(todo: Todo) {
    todo.isExpanded = !todo.isExpanded;
  }

  toggleCompleted(todo: Todo) {
    todo.completed = !todo.completed;
  }

  openDescriptionEditDialog(todo: Todo) {
    const editEescriptionDialogConfig = new MatDialogConfig();
    editEescriptionDialogConfig.data = todo;
    this.dialogRef.open(DescriptionEditPopUpDialogComponent, editEescriptionDialogConfig);
  }
}
