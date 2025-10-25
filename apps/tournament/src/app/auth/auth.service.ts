import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Usamos urls absoluta del backend en desarrollo para evitar problemas de proxy
  private base = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  register(payload: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.base}/register`, payload);
  }

  login(payload: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.base}/login`, payload);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
