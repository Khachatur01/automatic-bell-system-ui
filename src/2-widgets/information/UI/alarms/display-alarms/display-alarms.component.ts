import { Component, EventEmitter, input, InputSignal, Output } from '@angular/core';
import { AlarmWithId } from '@entities/alarm';
import { GroupByOutputIndexPipe } from '@widgets/information/UI/alarms/pipe/group-by-output-index.pipe';
import { KeyValuePipe } from '@angular/common';
import { DisplayAlarmComponent } from '@widgets/information/UI/alarms/display-alarm/display-alarm.component';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
    DeleteAlarmDialogComponent
} from '@widgets/information/UI/alarms/delete-alarm-dialog/delete-alarm-dialog.component';
import { lastValueFrom } from 'rxjs';

@Component({
    selector: 'widget-display-alarms',
    imports: [
        GroupByOutputIndexPipe,
        KeyValuePipe,
        DisplayAlarmComponent,
        MatIcon,
        MatFabButton,

    ],
    templateUrl: './display-alarms.component.html',
    styleUrl: './display-alarms.component.css',
})
export class DisplayAlarmsComponent {
    @Output()
    public readonly alarmDeleted: EventEmitter<AlarmWithId> = new EventEmitter<AlarmWithId>();

    public readonly alarms: InputSignal<AlarmWithId[]> = input.required();

    public constructor(
        private readonly dialog: MatDialog
    ) {}

    protected async openDeleteDialog(alarmWithId: AlarmWithId): Promise<void> {
        const dialogRef: MatDialogRef<DeleteAlarmDialogComponent> = this.dialog.open(DeleteAlarmDialogComponent, {
            data: { alarmWithId, },
        });

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const deleted: boolean = await lastValueFrom(dialogRef.afterClosed());
        if (deleted) {
            this.alarmDeleted.emit(alarmWithId);
        }
    }
}
