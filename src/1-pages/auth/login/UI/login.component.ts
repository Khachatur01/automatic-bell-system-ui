import { Component } from '@angular/core';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@shared';
import { Router } from '@angular/router';

@Component({
    selector: 'page-login',
    imports: [
        MatCard,
        MatCardTitle,
        MatInput,
        MatButton,
        MatFormField,
        MatFormFieldModule,
        ReactiveFormsModule,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent {
    protected form: FormGroup;
    protected loading: boolean = false;

    public constructor(
        private readonly fb: FormBuilder,
        private readonly authService: AuthService,
        private readonly snackBar: MatSnackBar,
        private readonly router: Router
    ) {
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
            await this.authService.login(password);
            this.loading = false;
            this.snackBar.open('Login successful!', 'Close', { duration: 3000, });
            await this.router.navigate([ '/', ]);
        } catch (err) {
            this.loading = false;
            this.snackBar.open('Login failed.', 'Close', { duration: 3000, });
        }
    }
}
