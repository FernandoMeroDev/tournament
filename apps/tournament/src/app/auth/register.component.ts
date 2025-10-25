import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="auth-card">
      <h2>Registro</h2>
      <form [formGroup]="form" (ngSubmit)="submit()">
        <label>
          Nombre
          <input formControlName="name" />
        </label>

        <label>
          Email
          <input formControlName="email" />
        </label>
        <label>
          Password
          <input type="password" formControlName="password" />
        </label>
        <div *ngIf="error" class="error">{{ error }}</div>
        <button type="submit">Registrar</button>
      </form>
      <a routerLink="/login">Entrar</a>
    </div>
  `,
})
export class RegisterComponent {
  form: any;

  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.error = null;
    this.auth.register(this.form.value as any).subscribe({
      next: (res) => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.error = err?.error?.message || 'Registration failed';
      },
    });
  }
}
