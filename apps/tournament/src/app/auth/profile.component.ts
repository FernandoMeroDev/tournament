import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: ` <p>Helous Gusmorming</p> `,
})
export class ProfileComponent {
  user: any = null;

  constructor(private http: HttpClient) {
    this.http.get('/api/auth/me').subscribe({ next: (u) => (this.user = u) });
  }
}
