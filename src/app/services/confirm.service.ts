import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  constructor(private dialog: MatDialog) {}

  showConfirm(message: string, title = 'Confirm'): Observable<boolean> {
    return this.dialog
      .open(ConfirmDialogComponent, { data: { title, message } })
      .afterClosed()
      .pipe(
        take(1),
      );
  }
}
