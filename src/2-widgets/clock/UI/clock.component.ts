import { Component } from '@angular/core';
import { MatFormField, MatHint, MatInput, MatLabel } from '@angular/material/input';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { NgxMatTimepickerComponent, NgxMatTimepickerDirective } from 'ngx-mat-timepicker';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ClockService } from '@shared/service/clock.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
    selector: 'widget-clock',
    imports: [
        MatFormField,
        MatDatepickerToggle,
        MatInput,
        MatHint,
        MatLabel,
        MatDatepicker,
        MatDatepickerInput,
        NgxMatTimepickerDirective,
        NgxMatTimepickerComponent,
        MatCard,
        MatCardContent,
        MatCardHeader,
        MatCardTitle,
        MatFabButton,
        MatIcon,
        FormsModule,
    ],
    templateUrl: './clock.component.html',
    styleUrl: './clock.component.css',
})
export class ClockComponent {
    protected datePickerValue: Date = new Date();
    protected timePickerValue: string = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    public constructor(
        private readonly clockService: ClockService,
        private readonly snackBar: MatSnackBar
    ) {}

    protected async syncDateTimeManually(): Promise<void> {
        const [ hourStr, minuteStr, ]: string[] = this.timePickerValue.split(':');

        const hour: number = parseInt(hourStr, 10);
        const minute: number = parseInt(minuteStr, 10);

        this.datePickerValue.setHours(hour);
        this.datePickerValue.setMinutes(minute);
        this.datePickerValue.setSeconds(0);


        try {
            await this.clockService.setClock(this.datePickerValue);
            this.snackBar.open('Clock successfully adjusted.', 'Close', { duration: 3000, });
        } catch (err) {
            this.snackBar.open('Clock adjustment failed.', 'Close', { duration: 3000, });
            console.error(err);
        }
    }

    protected async syncDateTimeAutomatically(): Promise<void> {
        try {
            await this.clockService.setClock(new Date());
            this.snackBar.open('Clock successfully adjusted.', 'Close', { duration: 3000, });
        } catch (err) {
            this.snackBar.open('Clock adjustment failed.', 'Close', { duration: 3000, });
            console.error(err);
        }
    }

    protected timeChanged($event: string): void {
        this.timePickerValue = $event;
    }
}
