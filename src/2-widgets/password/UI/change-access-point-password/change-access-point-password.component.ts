import { Component } from '@angular/core';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatFormField, MatInput } from '@angular/material/input';
import { AuthService } from '@shared';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'widget-change-access-point-password',
    imports: [
        MatCard,
        MatCardTitle,
        ReactiveFormsModule,
        MatFormField,
        MatButton,
        MatInput,
        MatFormFieldModule,
        MatIcon,
        MatIconButton,
    ],
  templateUrl: './change-access-point-password.component.html',
  styleUrl: './change-access-point-password.component.css',
})
export class ChangeAccessPointPasswordComponent {
    protected form: FormGroup;
    protected loading: boolean = false;
    protected passwordVisible: boolean = false;

    public constructor(private readonly fb: FormBuilder, private readonly authService: AuthService, private readonly snackBar: MatSnackBar) {
        this.form = this.fb.group({
            password: [ '', [ Validators.required, Validators.minLength(8), ], ],
        });
    }

    protected async onSubmit(): Promise<void> {
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        const password: string = this.form.value.password;

        try {
            await this.authService.changeAccessPointPassword(password);
            this.loading = false;
            this.snackBar.open('Access point password changed.', 'Close', { duration: 3000, });
        } catch (err) {
            this.loading = false;
            this.snackBar.open('Failed to change access point password.', 'Close', { duration: 3000, });
            console.error(err);
        }
    }
}
