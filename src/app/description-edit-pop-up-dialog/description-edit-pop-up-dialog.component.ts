import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Todo } from 'src/models/todo.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-description-edit-pop-up-dialog',
  templateUrl: './description-edit-pop-up-dialog.component.html',
  styleUrls: ['./description-edit-pop-up-dialog.component.scss']
})
export class DescriptionEditPopUpDialogComponent {
  currentTodo: Todo;
  copyTodo: Todo;
  isUpdating: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Todo,
    private dialogRef: MatDialogRef<DescriptionEditPopUpDialogComponent>,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {
    this.currentTodo = data;
    this.copyTodo = { ...this.currentTodo }; // zenklinimas ... tai - kopija. kopija tam, kad redagavimo metu redaguojamas tekstas nesikeistu kitose projekto vietose, o pasikeisti turi tik po mygtuko paspaudimo. Taip pat kopija reikalinga, kad jeigu api klaida ivyko, kad taip pat nepakeistu kitose projekto vietose.
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  updateTodoItem(): void {
    this.isUpdating = true;
    this.http.put<Todo>('http://localhost:3000/api/todos/${this.copyTodo.id}', this.copyTodo).subscribe({
      next: (data) => {
        this.currentTodo = this.copyTodo;
        console.log(data);
        this.snackBar.open('Todo item updated successfully.', 'OK', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.isUpdating = false;
        this.dialogRef.close();
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Failed to update todo item.', 'OK', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
        this.isUpdating = false;
        this.dialogRef.close();
      }
    });
  }
}
