import { Component, inject } from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { AlarmWithId } from '@entities/alarm';

@Component({
    selector: 'widget-delete-alarm-dialog',
    imports: [
        MatDialogContent,
        MatDialogActions,
        MatButton,
        MatDialogClose,
        MatDialogTitle,
    ],
    templateUrl: './delete-alarm-dialog.component.html',
    styleUrl: './delete-alarm-dialog.component.css',
})
export class DeleteAlarmDialogComponent {
    public readonly data: { alarmWithId: AlarmWithId } = inject<{ alarmWithId: AlarmWithId }>(MAT_DIALOG_DATA);

}
