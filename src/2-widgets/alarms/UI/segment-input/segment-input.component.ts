import { Component, computed, inject, InputSignal, model, ModelSignal, Signal } from '@angular/core';
import { MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRemove, MatChipRow } from '@angular/material/chips';
import {
    MatAutocomplete,
    MatAutocompleteSelectedEvent,
    MatAutocompleteTrigger,
    MatOption
} from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'widget-segment-input',
    imports: [
        MatFormField,
        MatChipGrid,
        MatChipRow,
        MatIcon,
        MatAutocomplete,
        MatChipRemove,
        MatLabel,
        MatOption,
        FormsModule,
        MatChipInput,
        MatAutocompleteTrigger,
    ],
  templateUrl: './segment-input.component.html',
  styleUrl: './segment-input.component.css',
})
export class SegmentInputComponent {
    public label: InputSignal<string> = model.required();
    public placeholder: InputSignal<string> = model.required();
    public values: InputSignal<unknown[]> = model.required();
    public usedValues: ModelSignal<unknown[]> = model.required();

    protected readonly announcer: LiveAnnouncer = inject(LiveAnnouncer);
    protected readonly separatorKeysCodes: number[] = [ ENTER, COMMA, ];
    protected readonly currentValue: ModelSignal<unknown> = model();
    protected readonly unusedValues: Signal<unknown[]> = computed((): unknown[] => {
        const usedValues: unknown[] = this.usedValues();
        return this.values().filter((value: unknown): boolean => !usedValues.includes(value));
    });

    protected add(event: MatChipInputEvent): void {
        const value: string = event.value;

        if (value) {
            this.usedValues.update((values: unknown[]): unknown[] => [ ...values, value, ]);
        }

        this.currentValue.set('');
    }

    protected remove(value: unknown): void {
        this.usedValues.update((values: unknown[]): unknown[] => {
            const index: number = values.indexOf(value);
            if (index < 0) {
                return values;
            }

            values.splice(index, 1);
            this.announcer.announce(`Removed ${ value }`);
            return [ ...values, ];
        });
    }

    protected use(event: MatAutocompleteSelectedEvent): void {
        this.usedValues.update((values: unknown[]): unknown[] => [ ...values, event.option.value, ]);
        this.currentValue.set('');
        event.option.deselect();
    }
}
