import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Todo } from 'src/models/todo.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-description-edit-pop-up-dialog',
  templateUrl: './description-edit-pop-up-dialog.component.html',
  styleUrls: ['./description-edit-pop-up-dialog.component.scss']
})
export class DescriptionEditPopUpDialogComponent {
  currentTodo: Todo;
  descriptionCopy: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Todo,
    private dialogRef: MatDialogRef<DescriptionEditPopUpDialogComponent>,
    private snackBar: MatSnackBar
  ) {
    this.currentTodo = data;
    this.descriptionCopy = data.description; // kopija tam, kad redagavimo metu nesikeistu tekstas visose projekto vietose iskart, o tik po paspaudimo.
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  updateTodoItem(): void {
    this.currentTodo.description = this.descriptionCopy;
    this.snackBar.open('Todo item updated successfully.', 'OK', {
      duration: 3000,
      panelClass: ['snackbar-success']
    });
    this.dialogRef.close();
  }
}
