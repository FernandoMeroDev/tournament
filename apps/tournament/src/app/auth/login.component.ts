import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `<div class="auth-card">
    <h2>Login</h2>
    <form [formGroup]="form" (ngSubmit)="submit()">
      <label>
        Email
        <input formControlName="email" />
      </label>
      <label>
        Password
        <input type="password" formControlName="password" />
      </label>
      <div *ngIf="error" class="error">{{ error }}</div>
      <button type="submit">Login</button>
    </form>
    <p>No tienes cuenta? <a routerLink="/register">Registrarse</a></p>
  </div>`,
})
export class LoginComponent {
  form: any;

  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.error = null;
    this.auth.login(this.form.value as any).subscribe({
      next: (res) => {
        this.auth.setToken(res.access_token);
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        this.error = err?.error?.message || 'Login failed';
      },
    });
  }
}
