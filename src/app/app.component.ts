import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Todo } from 'src/models/todo.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { DescriptionEditPopUpDialogComponent } from './description-edit-pop-up-dialog/description-edit-pop-up-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {  
  constructor(private dialogRef : MatDialog, private snackBar: MatSnackBar, private http: HttpClient){}

  todoList: Todo[] = [
    new Todo('Task 1', 'This is the description for task 1'),
    new Todo('Task 2', 'This is the description for task 2')
  ];

  ngOnInit(): void {
    //<Todo[]> - kokio tipo data is serverio gausiu
    this.http.get<Todo[]>('http://localhost:8080/api/todos').subscribe({
      next: (data) => {
        this.todoList = data;
        console.log('Successfully retrieved Todos data from API');
      },
      error: (error) => {
        console.log('Error retrieving Todos data from API:', error);
        this.snackBar.open('Failed to retrieve todo items.', 'OK', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }

  addTodoItem(newTodoForm : NgForm) {
    if(newTodoForm.valid){
      const newTodo = new Todo(newTodoForm.value.todoHeader, newTodoForm.value.todoDescription);
      this.http.post('http://localhost:8080/api/todos', newTodo).subscribe({
        next: () => {
          this.todoList.push(newTodo);
          newTodoForm.resetForm(); //skirtumas nuo .reset() tame, kad .resetForm() dar pakeicia subbmited i false, todel nerodys error messages po submito sekmingo
          this.snackBar.open('Todo item added successfully.', 'OK', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
        },
        error: (err) => {
          console.error('Error creating new todo item:', err);
          this.snackBar.open('Failed to add new todo item.', 'OK', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
        }
      });
    }
  }


  deleteTodoItem(todo: Todo): void {
    this.http.delete('http://localhost:8080/api/todos/'+ todo.id).subscribe({
      next: () => {
        const index = this.todoList.findIndex(t => t.id === todo.id);
        if (index !== -1) {
          this.todoList.splice(index, 1);
        }
        this.snackBar.open('Todo item deleted successfully.', 'OK', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Failed to delete todo item.', 'OK', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }
  
  toggleExpand(todo: Todo) {
    todo.isExpanded = !todo.isExpanded;
  }

  toggleCompleted(todo: Todo) {
    todo.completed = !todo.completed;
    this.http.put('http://localhost:8080/api/todos', todo).subscribe({
      next: () => {
        this.snackBar.open('Todo item updated successfully.', 'OK', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
      },
      error: (err) => {
        todo.completed = !todo.completed;
        console.error(err);
        this.snackBar.open('Failed to update todo item.', 'OK', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }

  openDescriptionEditDialog(todo: Todo) {
    const editEescriptionDialogConfig = new MatDialogConfig();
    editEescriptionDialogConfig.data = todo;
    this.dialogRef.open(DescriptionEditPopUpDialogComponent, editEescriptionDialogConfig);
  }
}
