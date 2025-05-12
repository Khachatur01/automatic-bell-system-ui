import { Component } from '@angular/core';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatInput } from '@angular/material/input';
import { AuthService } from '@shared';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'widget-change-user-password',
    imports: [
        MatCard,
        ReactiveFormsModule,
        MatFormField,
        MatInput,
        MatButton,
        MatFormFieldModule,
        MatCardTitle,
        MatIconButton,
        MatIcon,
    ],
    templateUrl: './change-user-password.component.html',
    styleUrl: './change-user-password.component.css',
})
export class ChangeUserPasswordComponent {
    protected form: FormGroup;
    protected loading: boolean = false;
    protected passwordVisible: boolean = false;

    public constructor(private readonly fb: FormBuilder, private readonly authService: AuthService, private readonly snackBar: MatSnackBar) {
        this.form = this.fb.group({
            password: [ '', Validators.required, ],
        });
    }

    protected async onSubmit(): Promise<void> {
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        const password: string = this.form.value.password;

        try {
            await this.authService.changeUserPassword(password);
            this.loading = false;
            this.snackBar.open('User password changed.', 'Close', { duration: 3000, });
        } catch (err) {
            this.loading = false;
            this.snackBar.open('Failed to change user password.', 'Close', { duration: 3000, });
            console.error(err);
        }
    }
}
